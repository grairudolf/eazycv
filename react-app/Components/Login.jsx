import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../src/utils/validation';
import { ExclamationTriangleIcon, CheckIcon } from '../src/utils/icons';
import { loginUser } from '../src/utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setSubmitError('');

    try {
      loginUser({ email: formData.email, password: formData.password });
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/form');
      }, 600);
    } catch (err) {
      setSubmitError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back
              </h1>
              <p className="text-gray-600 text-base">
                Sign in to access your CVs on this device.
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <CheckIcon className="w-5 h-5" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span className="font-medium">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                    errors.email
                      ? 'border-red-500 bg-red-50 focus:border-red-600'
                      : 'border-gray-300 bg-white focus:border-blue-600'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationTriangleIcon className="w-4 h-4" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-200 focus:outline-none ${
                    errors.password
                      ? 'border-red-500 bg-red-50 focus:border-red-600'
                      : 'border-gray-300 bg-white focus:border-blue-600'
                  }`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <ExclamationTriangleIcon className="w-4 h-4" /> {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">New here?</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Link
              to="/signup"
              className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
            >
              Create an account
            </Link>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            This is a demo app. Your data stays local on your device.
          </p>
        </div>
      </div>
    </>
  );
}
