const PASSWORD_SPECIAL_CHARS = /[!@#$%^&*(),.?":{}|<>]/;

export const PASSWORD_REQUIREMENTS = [
  { key: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
  { key: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
  { key: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
  { key: 'number', label: 'One number', test: (pwd) => /[0-9]/.test(pwd) },
  { key: 'special', label: 'One special character', test: (pwd) => PASSWORD_SPECIAL_CHARS.test(pwd) },
];

export const getPasswordChecks = (password) =>
  PASSWORD_REQUIREMENTS.reduce((checks, { key, test }) => {
    checks[key] = test(password);
    return checks;
  }, {});

export const getPasswordValidationError = (password) => {
  if (!password) return 'Password required';
  const failed = PASSWORD_REQUIREMENTS.find(({ test }) => !test(password));
  if (!failed) return null;
  if (failed.key === 'length') return 'Password must be at least 8 characters.';
  if (failed.key === 'uppercase') return 'Password must contain at least one uppercase letter.';
  if (failed.key === 'lowercase') return 'Password must contain at least one lowercase letter.';
  if (failed.key === 'number') return 'Password must contain at least one number.';
  return 'Password must contain at least one special character.';
};
