const jwt = require('jsonwebtoken');
const adminAccountService = require('../services/adminAccountService');


const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Administrator authentication required',
      });
    }

    if (!adminAccountService.isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'Administrator access is not configured on this server',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.aud !== 'guardup-admin') {
      return res.status(403).json({
        success: false,
        message: 'Invalid administrator credentials',
      });
    }

    const admin = adminAccountService.getProfile();
    if (!admin || decoded.email !== admin.email) {
      return res.status(401).json({
        success: false,
        message: 'Administrator session invalid',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Administrator session expired or invalid',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Administrator authentication error',
    });
  }
};

module.exports = adminAuth;
