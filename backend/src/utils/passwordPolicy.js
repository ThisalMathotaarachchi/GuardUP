const PASSWORD_SPECIAL_CHARS = /[!@#$%^&*(),.?":{}|<>]/;

const PASSWORD_RULES = [
  {
    key: 'length',
    test: (pwd) => pwd.length >= 8,
    message: 'Password must be at least 8 characters.',
  },
  {
    key: 'uppercase',
    test: (pwd) => /[A-Z]/.test(pwd),
    message: 'Password must contain at least one uppercase letter.',
  },
  {
    key: 'lowercase',
    test: (pwd) => /[a-z]/.test(pwd),
    message: 'Password must contain at least one lowercase letter.',
  },
  {
    key: 'number',
    test: (pwd) => /[0-9]/.test(pwd),
    message: 'Password must contain at least one number.',
  },
  {
    key: 'special',
    test: (pwd) => PASSWORD_SPECIAL_CHARS.test(pwd),
    message: 'Password must contain at least one special character.',
  },
];

const getPasswordValidationError = (password) => {
  if (!password) return 'Password is required.';
  const failedRule = PASSWORD_RULES.find((rule) => !rule.test(password));
  return failedRule ? failedRule.message : null;
};

const getPasswordChecks = (password) =>
  PASSWORD_RULES.reduce((checks, rule) => {
    checks[rule.key] = rule.test(password);
    return checks;
  }, {});

module.exports = {
  PASSWORD_RULES,
  getPasswordValidationError,
  getPasswordChecks,
};
