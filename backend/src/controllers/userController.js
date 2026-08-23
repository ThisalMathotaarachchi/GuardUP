const userService = require('../services/userService');
const { changePasswordSchema } = require('../utils/validation');
const { mergeUserPreferences } = require('../utils/userSerializer');

exports.updateSkillLevel = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { skillLevel, assessmentScore } = req.body;

    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const updatedUser = await userService.update(userId, {
      skillLevel,
      assessmentScore,
      hasTakenAssessment: true,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const history = user.simulationHistory || [];
    const avgScore = history.length > 0
      ? Math.round(history.reduce((sum, h) => sum + (h.score || 0), 0) / history.length)
      : 0;
    const totalMinutes = history.reduce(
      (sum, h) => sum + (h.behaviorData?.totalTime ?? h.totalTime ?? 0),
      0
    );
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

    res.status(200).json({
      success: true,
      data: {
        totalXP: user.xp || 0,
        totalSims: user.totalSimulations || 0,
        avgScore,
        badges: user.badges || [],
        totalHours,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { preferences } = req.body;

    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const updatedUser = await userService.update(userId, {
      preferences: mergeUserPreferences(user.preferences, preferences),
    });

    const { password, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName } = req.body;

    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const updates = {};
    if (firstName !== undefined) updates.firstName = firstName.trim();
    if (lastName !== undefined) updates.lastName = lastName.trim();

    const updatedUser = await userService.update(userId, updates);
    const { password, ...userWithoutPassword } = updatedUser;

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match.',
      });
    }

    await userService.changePassword(req.user.id, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const confirmation = String(req.body?.confirmation || '').trim();
    if (confirmation !== 'DELETE') {
      return res.status(400).json({
        success: false,
        message: 'Type DELETE to confirm account removal.',
      });
    }

    const deleted = await userService.deleteAccount(req.user.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
