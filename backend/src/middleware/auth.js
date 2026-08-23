const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.aud === 'guardup-admin') {
      return res.status(403).json({
        success: false,
        message: 'Administrator token cannot access user endpoints',
      });
    }

    const user = await userService.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }


    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

module.exports = auth;
