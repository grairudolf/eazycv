/**
 * Calculate password strength score (0-5)
 */
export function calculatePasswordStrength(password) {
  let strength = 0;
  
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
  
  return strength;
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(strength) {
  const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
  return labels[strength] || 'Too weak';
}

/**
 * Get password strength color
 */
export function getPasswordStrengthColor(strength) {
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-green-600'];
  return colors[strength] || 'bg-red-500';
}

/**
 * Validate email
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password (minimum 6 characters)
 */
export function isValidPassword(password) {
  return password.length >= 6;
}
