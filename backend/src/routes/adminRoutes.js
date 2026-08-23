const express = require('express');
const adminAuth = require('../middleware/adminAuth');
const adminAuthController = require('../controllers/adminAuthController');
const {
  getDashboard,
  getStats,
  getAllUsers,
  getUserById,
  getCertifications,
  getSimulations,
  getAnalytics,
  getActivity,
  getSettings,
} = require('../controllers/adminController');

const { adminLoginLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.post('/auth/login', adminLoginLimiter, adminAuthController.login);
router.get('/auth/me', adminAuth, adminAuthController.me);
router.post('/auth/logout', adminAuth, adminAuthController.logout);

router.get('/dashboard', adminAuth, getDashboard);
router.get('/stats', adminAuth, getStats);
router.get('/users', adminAuth, getAllUsers);
router.get('/users/:id', adminAuth, getUserById);
router.get('/certifications', adminAuth, getCertifications);
router.get('/simulations', adminAuth, getSimulations);
router.get('/analytics', adminAuth, getAnalytics);
router.get('/activity', adminAuth, getActivity);
router.get('/settings', adminAuth, getSettings);

module.exports = router;
