const Joi = require('joi');
const { getPasswordValidationError } = require('./passwordPolicy');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string()
    .required()
    .custom((value, helpers) => {
      const message = getPasswordValidationError(value);
      if (message) {
        return helpers.error('password.policy', { message });
      }
      return value;
    })
    .messages({
      'any.required': 'Password is required.',
      'string.empty': 'Password is required.',
      'password.policy': '{{#message}}',
    }),
  firstName: Joi.string().min(2).required().messages({
    'string.min': 'First name must be at least 2 characters.',
    'any.required': 'First name is required.',
  }),
  lastName: Joi.string().min(2).required().messages({
    'string.min': 'Last name must be at least 2 characters.',
    'any.required': 'Last name is required.',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'any.required': 'Current password is required.',
    'string.empty': 'Current password is required.',
  }),
  newPassword: Joi.string()
    .required()
    .custom((value, helpers) => {
      const message = getPasswordValidationError(value);
      if (message) {
        return helpers.error('password.policy', { message });
      }
      return value;
    })
    .messages({
      'any.required': 'New password is required.',
      'string.empty': 'New password is required.',
      'password.policy': '{{#message}}',
    }),
  confirmPassword: Joi.string().required().messages({
    'any.required': 'Password confirmation is required.',
    'string.empty': 'Password confirmation is required.',
  }),
});

module.exports = { registerSchema, loginSchema, changePasswordSchema };
