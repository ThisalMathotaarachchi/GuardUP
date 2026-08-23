const express = require('express');
const auth = require('../middleware/auth');
const {
  getAllResults,
  getResult,
  saveAttempt,
} = require('../controllers/quizController');

const router = express.Router();

router.get('/results', auth, getAllResults);
router.get('/:quizId/result', auth, getResult);
router.post('/:quizId/attempt', auth, saveAttempt);

module.exports = router;
