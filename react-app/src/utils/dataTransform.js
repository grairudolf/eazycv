/**
 * Data Transformation Utilities
 * Handles bidirectional transformation between React component format and backend API format
 */

/**
 * Transforms React form data structure to backend API format
 * Converts React's flat structure to backend's nested schema with proper data types
 * 
 * @param {Object} reactData - Form data from React component
 * @param {string} reactData.firstName - User's first name
 * @param {string} reactData.secondName - User's last name
 * @param {string} reactData.email - User's email address
 * @param {string} reactData.phone - User's phone number
 * @param {string} reactData.city - City of residence
 * @param {string} reactData.country - Country of residence
 * @param {string} reactData.education - Degree or education level
 * @param {string} reactData.school - Institution name
 * @param {string} reactData.skills - Comma-separated skills
 * @param {string} reactData.bio - Professional summary
 * @param {string} reactData.experience - Work experience description
 * @returns {Object} Backend-compatible CV schema
 * @example
 * const reactData = { firstName: 'John', secondName: 'Doe', email: 'john@example.com', ... };
 * const backendData = transformToBackendFormat(reactData);
 */
export function transformToBackendFormat(reactData) {
  const {
    firstName = '',
    secondName = '',
    title = '',
    email = '',
    phone = '',
    city = '',
    country = '',
    website = '',
    linkedin = '',
    summary = '',
    experiences = [],
    educations = [],
    skills = '',
  } = reactData;

  // Combine first and second name
  const fullName = `${firstName} ${secondName}`.trim();

  // Combine city and country for location
  const location = [city, country].filter(Boolean).join(', ');

  // Parse skills string into array, removing empty entries
  const skillsArray = skills
    .split(',')
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 0);

  const experienceArray = experiences
    .map((exp) => ({
      role: exp.role || '',
      company: exp.company || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
    }))
    .filter((exp) => exp.role || exp.company || exp.description);

  const educationArray = educations
    .map((edu) => ({
      degree: edu.degree || '',
      institution: edu.institution || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || '',
    }))
    .filter((edu) => edu.degree || edu.institution);

  return {
    personal: {
      name: fullName,
      title,
      email,
      phone,
      location,
      website: website || undefined,
      linkedin: linkedin || undefined,
      summary,
    },
    experience: experienceArray,
    education: educationArray,
    skills: skillsArray,
  };
}

/**
 * Transforms backend API response to React component format
 * Converts backend's nested schema to React's flat structure for easy component use
 * Prioritizes optimized_cv field (from AI optimization) over original summary
 * 
 * @param {Object} backendData - CV data from backend API response
 * @param {Object} backendData.personal - Personal information object
 * @param {string} backendData.personal.name - Full name
 * @param {string} backendData.personal.email - Email address
 * @param {string} backendData.personal.phone - Phone number
 * @param {string} backendData.personal.location - City, Country format
 * @param {string} backendData.personal.summary - Original professional summary
 * @param {string} backendData.optimized_cv - AI-optimized summary (optional)
 * @param {Array} backendData.experience - Array of experience objects
 * @param {Array} backendData.education - Array of education objects
 * @param {Array} backendData.skills - Array of skill strings
 * @returns {Object} React component-compatible data structure
 * @example
 * const backendData = { personal: { name: 'John Doe', ... }, experience: [...], ... };
 * const reactData = transformToReactFormat(backendData);
 * // reactData.firstName === 'John'
 * // reactData.bio === backendData.optimized_cv || backendData.personal.summary
 */
export function transformToReactFormat(backendData) {
  const { personal = {}, experience = [], education = [], skills = [], optimized_cv = null } = backendData;

  // Split name into first and second name
  const nameParts = (personal.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const secondName = nameParts.slice(1).join(' ') || '';

  // Split location into city and country
  const locationParts = (personal.location || '').split(',').map((part) => part.trim());
  const city = locationParts[0] || '';
  const country = locationParts[1] || '';

  // Join skills into comma-separated string
  const skillsString = skills.join(', ');

  return {
    firstName,
    secondName,
    title: personal.title || '',
    email: personal.email || '',
    phone: personal.phone || '',
    website: personal.website || '',
    linkedin: personal.linkedin || '',
    city,
    country,
    educations: education.map((edu) => ({
      degree: edu.degree || '',
      institution: edu.institution || '',
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description || '',
    })),
    skills: skillsString,
    // IMPORTANT: Prioritize optimized_cv (from AI optimization) over original summary
    // This ensures that optimized summaries persist across page reloads
    summary: optimized_cv || personal.summary || '',
    experiences: experience.map((exp) => ({
      role: exp.role || '',
      company: exp.company || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
    })),
  };
}
