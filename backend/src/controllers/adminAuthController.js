const jwt = require('jsonwebtoken');
const adminAccountService = require('../services/adminAccountService');
const { logEvent } = require('../services/auditService');
const { loginSchema } = require('../utils/validation');

const generateAdminToken = (email) =>
  jwt.sign(
    { aud: 'guardup-admin', email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ADMIN_JWT_EXPIRE || '8h' }
  );

exports.login = async (req, res, next) => {
  try {
    if (!adminAccountService.isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Administrator access is not configured on this server',
      });
    }

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    const valid = await adminAccountService.validateCredentials(email, password);

    if (!valid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    const admin = adminAccountService.getProfile();
    const token = generateAdminToken(admin.email);

    logEvent('admin_login', {
      actorType: 'admin',
      actorEmail: admin.email,
      summary: 'Administrator signed in',
    });

    res.status(200).json({
      success: true,
      data: { admin, token },
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res) => {
  res.status(200).json({
    success: true,
    data: { admin: req.admin },
  });
};

exports.logout = async (req, res) => {
  logEvent('admin_logout', {
    actorType: 'admin',
    actorEmail: req.admin?.email,
    summary: 'Administrator signed out',
  });

  res.status(200).json({
    success: true,
    message: 'Administrator session ended',
  });
};
