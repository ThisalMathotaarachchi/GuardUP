const express = require('express');
const auth = require('../middleware/auth');
const { awardAchievement } = require('../controllers/achievementController');

const router = express.Router();

router.post('/award', auth, awardAchievement);

module.exports = router;
