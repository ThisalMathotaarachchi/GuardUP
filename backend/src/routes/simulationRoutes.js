const express = require('express');
const auth = require('../middleware/auth');
const { completeSimulation, getSimulationHistory } = require('../controllers/simulationController');

const router = express.Router();

router.post('/complete', auth, completeSimulation);
router.get('/history', auth, getSimulationHistory);

module.exports = router;
