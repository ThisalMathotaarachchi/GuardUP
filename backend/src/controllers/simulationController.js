const userService = require('../services/userService');
const { logEvent } = require('../services/auditService');
const notificationEvents = require('../services/notificationEvents');

const emitSimulationNotifications = async (userId, { meta, newBadges }) => {
  if (meta.passed && meta.wasFirstPass) {
    await notificationEvents.onSimulationCompleted(userId, meta.simulationId);
  }

  if (meta.levelUp) {
    await notificationEvents.onLevelUp(userId, meta.newLevel);
  }

  if (newBadges?.length) {
    for (const badge of newBadges) {
      await notificationEvents.onBadgeEarned(userId, badge);
    }
  }
};

exports.completeSimulation = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { simulationId, level, results } = req.body;

    if (!simulationId || !results) {
      return res.status(400).json({
        success: false,
        message: 'simulationId and results are required',
      });
    }

    const { user: updatedUser, newBadges, meta } = await userService.completeSimulation(userId, {
      simulationId,
      level,
      results,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    logEvent('simulation_completed', {
      actorType: 'user',
      userId: meta.userId,
      userEmail: meta.userEmail,
      simulationId: meta.simulationId,
      score: meta.score,
      passed: meta.passed,
      summary: `Simulation completed: ${meta.simulationId} (${meta.score}%)`,
    });

    if (newBadges?.length) {
      newBadges.forEach((badge) => {
        logEvent('badge_awarded', {
          actorType: 'user',
          userId: meta.userId,
          userEmail: meta.userEmail,
          badgeId: badge.id || badge.name,
          summary: `Badge awarded: ${badge.name || badge.id}`,
        });
      });
    }

    emitSimulationNotifications(userId, { meta, newBadges }).catch((error) => {
      console.error('[notifications] Simulation notification dispatch failed:', error.message);
    });

    res.status(200).json({
      success: true,
      data: {
        user: userWithoutPassword,
        newBadges,
      },
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.getSimulationHistory = async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const history = (await userService.getSimulationHistory(req.user.id)).map((entry) => ({
      ...entry,
      date: entry.completedAt || entry.date,
    }));

    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    next(error);
  }
};
