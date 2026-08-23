const rateLimit = require('express-rate-limit');

const jsonLimitResponse = (req, res) => {
  res.status(429).json({
    success: false,
    message: 'Too many attempts. Please try again later.',
  });
};

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitResponse,
});

const passwordChangeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitResponse,
});

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonLimitResponse,
});

module.exports = {
  authLimiter,
  passwordChangeLimiter,
  adminLoginLimiter,
};
