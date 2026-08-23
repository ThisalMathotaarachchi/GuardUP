const quizService = require('../services/quizService');

exports.getAllResults = async (req, res, next) => {
  try {
    const results = await quizService.getAllResults(req.user.id);
    res.status(200).json({
      success: true,
      data: { results },
    });
  } catch (error) {
    next(error);
  }
};

exports.getResult = async (req, res, next) => {
  try {
    const result = await quizService.getResult(req.user.id, req.params.quizId);
    res.status(200).json({
      success: true,
      data: { result },
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.saveAttempt = async (req, res, next) => {
  try {
    const result = await quizService.saveAttempt(req.user.id, req.params.quizId, req.body);
    res.status(200).json({
      success: true,
      data: { result },
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};
