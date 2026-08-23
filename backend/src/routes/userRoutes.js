const express = require('express');
const {
  updateSkillLevel,
  getUserStats,
  updateSettings,
  updateProfile,
  changePassword,
  deleteAccount,
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const { passwordChangeLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.put('/skill-level', auth, updateSkillLevel);
router.get('/stats', auth, getUserStats);
router.put('/settings', auth, updateSettings);
router.put('/profile', auth, updateProfile);
router.put('/password', auth, passwordChangeLimiter, changePassword);
router.delete('/account', auth, deleteAccount);

module.exports = router;
