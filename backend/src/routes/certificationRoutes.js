const express = require('express');
const auth = require('../middleware/auth');
const {
  getAllProgress,
  getProgress,
  completeActivity,
} = require('../controllers/certificationProgressController');

const router = express.Router();

router.get('/progress', auth, getAllProgress);
router.get('/:certificationId/progress', auth, getProgress);
router.post('/:certificationId/activities/:activityId/complete', auth, completeActivity);

module.exports = router;
