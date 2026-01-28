export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validatePhone = (phone) => {
  // Basic phone validation (10 digits)
  const re = /^\d{10}$/;
  return re.test(phone.replace(/[-\s()]/g, ''));
};

export const validateZipCode = (zip) => {
  // US zip code validation (5 digits)
  const re = /^\d{5}$/;
  return re.test(zip);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${fieldRules.label || field} is required`;
    } else if (fieldRules.email && value && !validateEmail(value)) {
      errors[field] = 'Please enter a valid email address';
    } else if (fieldRules.password && value && !validatePassword(value)) {
      errors[field] = 'Password must be at least 6 characters';
    } else if (fieldRules.phone && value && !validatePhone(value)) {
      errors[field] = 'Please enter a valid phone number';
    } else if (fieldRules.zipCode && value && !validateZipCode(value)) {
      errors[field] = 'Please enter a valid zip code';
    } else if (fieldRules.match && value !== formData[fieldRules.match]) {
      errors[field] = `${fieldRules.label || field} does not match`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
