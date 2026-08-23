const certificationProgressService = require('../services/certificationProgressService');

exports.getAllProgress = async (req, res, next) => {
  try {
    const progress = await certificationProgressService.getAllProgress(req.user.id);
    res.status(200).json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProgress = async (req, res, next) => {
  try {
    const progress = await certificationProgressService.getProgress(
      req.user.id,
      req.params.certificationId
    );
    res.status(200).json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.completeActivity = async (req, res, next) => {
  try {
    const { certificationId, activityId } = req.params;
    const result = await certificationProgressService.markActivityComplete(
      req.user.id,
      certificationId,
      activityId
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};
