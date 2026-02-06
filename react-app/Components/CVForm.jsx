import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cvService } from '../src/services/api';
import { ExclamationTriangleIcon, CheckIcon } from '../src/utils/icons';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Experience' },
  { id: 3, title: 'Education' },
  { id: 4, title: 'Skills' },
];

const emptyExperience = {
  role: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
};

const emptyEducation = {
  degree: '',
  institution: '',
  startDate: '',
  endDate: '',
  description: '',
};

const createDefaultFormData = () => ({
  firstName: '',
  secondName: '',
  title: '',
  email: '',
  phone: '',
  website: '',
  linkedin: '',
  city: '',
  country: '',
  summary: '',
  experiences: [{ ...emptyExperience }],
  educations: [{ ...emptyEducation }],
  skills: '',
});

const getDefaultFormData = () => ({
  ...createDefaultFormData(),
});

export default function CVForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastSavedAt, setLastSavedAt] = useState('');
  const [toast, setToast] = useState('');

  const [formData, setFormData] = useState(() => {
    const savedRaw = localStorage.getItem('cvFormDraft');
    if (!savedRaw) {
      return getDefaultFormData();
    }

    try {
      const parsed = JSON.parse(savedRaw);
      return {
        ...getDefaultFormData(),
        ...parsed,
        experiences: parsed.experiences && parsed.experiences.length > 0
          ? parsed.experiences
          : [{ ...emptyExperience }],
        educations: parsed.educations && parsed.educations.length > 0
          ? parsed.educations
          : [{ ...emptyEducation }],
      };
    } catch {
      return defaultFormData;
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('cvFormDraft', JSON.stringify(formData));
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSavedAt(`Draft saved at ${timestamp}`);
    }, 1200);

    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const validatePersonal = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.secondName.trim()) newErrors.secondName = 'Last name is required';
    if (!formData.title.trim()) newErrors.title = 'Professional title is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.summary.trim()) newErrors.summary = 'Summary is required';
    return newErrors;
  };

  const validateExperience = () => {
    const newErrors = {};
    const hasAny = formData.experiences.some((exp) =>
      exp.role.trim() || exp.company.trim() || exp.description.trim()
    );
    if (!hasAny) {
      newErrors.experiences = 'Add at least one experience entry.';
    }
    return newErrors;
  };

  const validateEducation = () => {
    const newErrors = {};
    const hasAny = formData.educations.some((edu) =>
      edu.degree.trim() || edu.institution.trim()
    );
    if (!hasAny) {
      newErrors.educations = 'Add at least one education entry.';
    }
    return newErrors;
  };

  const validateSkills = () => {
    const newErrors = {};
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
    return newErrors;
  };

  const validateStep = (stepId) => {
    let newErrors = {};
    if (stepId === 1) newErrors = validatePersonal();
    if (stepId === 2) newErrors = validateExperience();
    if (stepId === 3) newErrors = validateEducation();
    if (stepId === 4) newErrors = validateSkills();

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: '',
      }));
    }
  };
  const handleExperienceChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.experiences];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experiences: updated };
    });
  };

  const handleEducationChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.educations];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, educations: updated };
    });
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { ...emptyExperience }],
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [...prev.educations, { ...emptyEducation }],
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, idx) => idx !== index),
    }));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('cvFormDraft', JSON.stringify(formData));
    setToast('Draft saved');
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSavedAt(`Draft saved at ${timestamp}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allErrors = {
      ...validatePersonal(),
      ...validateExperience(),
      ...validateEducation(),
      ...validateSkills(),
    };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setCurrentStep(1);
      return;
    }

    setLoading(true);
    try {
      const response = await cvService.create(formData);
      const createdId = response.data.id;
      localStorage.setItem('eazycv_current_cv_id', createdId);
      localStorage.setItem('cvData', JSON.stringify(formData));
      localStorage.removeItem('cvFormDraft');
      navigate(`/cv/${createdId}`);
    } catch (error) {
      setToast('Error creating CV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = STEPS[currentStep - 1];
  const progress = (currentStep / STEPS.length) * 100;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-8 sm:py-12 px-3 sm:px-4">
        {toast && (
          <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">
            {toast}
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-8 py-8 sm:py-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Build Your CV</h1>
                  <p className="text-blue-100 text-sm sm:text-base">Step {currentStep} of {STEPS.length}: {currentStepData.title}</p>
                </div>
                <div className="text-xs text-blue-100 min-h-[1rem]">
                  {lastSavedAt}
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-8 pt-6 sm:pt-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  {STEPS.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (step.id <= currentStep) {
                            setCurrentStep(step.id);
                            window.scrollTo(0, 0);
                          }
                        }}
                        disabled={step.id > currentStep}
                        className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${
                          currentStep === step.id
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110'
                            : currentStep > step.id
                            ? 'bg-green-500 text-white cursor-pointer hover:shadow-md'
                            : 'bg-gray-200 text-gray-600 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {currentStep > step.id ? <CheckIcon className="w-5 h-5" /> : step.id}
                      </button>
                      {step.id < STEPS.length && (
                        <div className={`w-12 h-1 mx-1 rounded ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="px-4 sm:px-8 py-8 sm:py-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
                </div>
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                            errors.firstName ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                          }`}
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" /> {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="secondName" className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                        <input
                          type="text"
                          id="secondName"
                          value={formData.secondName}
                          onChange={handleChange}
                          placeholder="Doe"
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                            errors.secondName ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                          }`}
                        />
                        {errors.secondName && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" /> {errors.secondName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">Professional Title</label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Full-Stack Developer"
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                          errors.title ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                        }`}
                      />
                      {errors.title && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" /> {errors.title}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                            errors.email ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" /> {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 555 000 1234"
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                            errors.phone ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">Website (optional)</label>
                        <input
                          type="text"
                          id="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="portfolio.com"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-900 mb-2">LinkedIn (optional)</label>
                        <input
                          type="text"
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          placeholder="linkedin.com/in/username"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                        <input
                          type="text"
                          id="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Douala"
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                            errors.city ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" /> {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
                        <input
                          type="text"
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="e.g. Cameroon"
                          className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                            errors.country ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                          }`}
                        />
                        {errors.country && (
                          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                            <ExclamationTriangleIcon className="w-4 h-4" /> {errors.country}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="summary" className="block text-sm font-semibold text-gray-900 mb-2">Professional Summary</label>
                      <textarea
                        id="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="A brief summary about who you are and what you do..."
                        rows={4}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none resize-none ${
                          errors.summary ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                        }`}
                      />
                      {errors.summary && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" /> {errors.summary}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    {errors.experiences && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <ExclamationTriangleIcon className="w-4 h-4" /> {errors.experiences}
                      </p>
                    )}
                    {formData.experiences.map((exp, index) => (
                      <div key={`exp-${index}`} className="border border-gray-200 rounded-xl p-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900">Experience {index + 1}</h3>
                          {formData.experiences.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveExperience(index)}
                              className="text-sm text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                            placeholder="Role (e.g., Product Manager)"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            placeholder="Company"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                            placeholder="Start date (e.g., Jan 2022)"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                            placeholder="End date (e.g., Present)"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                        </div>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements..."
                          rows={4}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 resize-none"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="px-5 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      + Add experience
                    </button>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    {errors.educations && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <ExclamationTriangleIcon className="w-4 h-4" /> {errors.educations}
                      </p>
                    )}
                    {formData.educations.map((edu, index) => (
                      <div key={`edu-${index}`} className="border border-gray-200 rounded-xl p-5 space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900">Education {index + 1}</h3>
                          {formData.educations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveEducation(index)}
                              className="text-sm text-red-500 hover:text-red-600"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            placeholder="Degree (e.g., BSc Computer Science)"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                            placeholder="Institution"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                            placeholder="Start date"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                            placeholder="End date"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600"
                          />
                        </div>
                        <textarea
                          value={edu.description}
                          onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                          placeholder="Honors, thesis, or notable coursework..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 resize-none"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddEducation}
                      className="px-5 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      + Add education
                    </button>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="skills" className="block text-sm font-semibold text-gray-900 mb-2">Skills (comma separated)</label>
                      <textarea
                        id="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g. JavaScript, React, Node.js, Figma"
                        rows={4}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none resize-none ${
                          errors.skills ? 'border-red-500 bg-red-50 focus:border-red-600' : 'border-gray-300 focus:border-blue-600'
                        }`}
                      />
                      {errors.skills && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <ExclamationTriangleIcon className="w-4 h-4" /> {errors.skills}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex gap-4 mt-8 border-t pt-8">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    Save Draft
                  </button>

                  {currentStep < STEPS.length ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Creating CV...
                        </span>
                      ) : (
                        'Create CV'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
