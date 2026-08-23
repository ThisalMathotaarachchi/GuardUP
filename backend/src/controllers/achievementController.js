const userService = require('../services/userService');
const badgeService = require('../services/badgeService');
const certificationProgressService = require('../services/certificationProgressService');
const quizService = require('../services/quizService');
const { logEvent } = require('../services/auditService');
const notificationEvents = require('../services/notificationEvents');
const {
  CERTIFICATION_BADGE_MAP,
  QUIZ_BADGE_MAP,
  VALID_CERTIFICATION_IDS,
  VALID_QUIZ_IDS,
} = require('../data/badgeDefinitions');

const stripPassword = (user) => {
  if (!user) return user;
  const { password, ...rest } = user;
  return rest;
};

exports.awardAchievement = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { type, certificationId, quizId, percentage, passed } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'type is required',
      });
    }

    if (type === 'certification') {
      if (!certificationId || !VALID_CERTIFICATION_IDS.has(certificationId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or missing certificationId',
        });
      }

      await certificationProgressService.recordCertificationCompletion(userId, certificationId);

      const badgeId = CERTIFICATION_BADGE_MAP[certificationId];
      const result = await badgeService.awardBadge(userId, badgeId, {
        context: { certificationId },
      });

      const updatedUser = await userService.findById(userId);
      const userWithoutPassword = stripPassword(updatedUser);

      if (result.isNew) {
        logEvent('certification_completed', {
          actorType: 'user',
          userId,
          userEmail: updatedUser.email,
          certificationId,
          summary: `Certification completed: ${certificationId}`,
        });
        logEvent('badge_awarded', {
          actorType: 'user',
          userId,
          userEmail: updatedUser.email,
          badgeId: badgeId,
          summary: `Badge awarded: ${badgeId}`,
        });

        Promise.all([
          notificationEvents.onCertificationCompleted(userId, certificationId),
          notificationEvents.onBadgeEarned(userId, result.badge),
        ]).catch((error) => {
          console.error('[notifications] Certification notification dispatch failed:', error.message);
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          user: userWithoutPassword,
          badge: result.badge,
          isNew: result.isNew,
          newBadges: result.isNew ? [result.badge] : [],
        },
      });
    }

    if (type === 'quiz') {
      if (!quizId || !VALID_QUIZ_IDS.has(quizId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or missing quizId',
        });
      }

      const storedAttempt = await quizService.getResult(userId, quizId);
      if (!storedAttempt) {
        return res.status(400).json({
          success: false,
          message: 'Quiz attempt not found. Complete the quiz before requesting an award.',
        });
      }

      const numericPercentage = storedAttempt.percentage;
      const threshold = quizService.getPassThreshold(quizId);
      const didPass = storedAttempt.passed && numericPercentage >= threshold;

      if (!didPass || passed !== true) {
        return res.status(400).json({
          success: false,
          message: 'Quiz pass criteria not met',
        });
      }

      const badgeIds = [QUIZ_BADGE_MAP[quizId]];
      if (numericPercentage >= 100) {
        badgeIds.push('quiz_perfect_score');
      }

      const result = await badgeService.awardBadges(userId, badgeIds, {
        context: { quizId, percentage: numericPercentage },
      });

      const updatedUser = await userService.findById(userId);
      const userWithoutPassword = stripPassword(updatedUser);

      if (result.isNew && result.newBadges?.length) {
        result.newBadges.forEach((badge) => {
          logEvent('badge_awarded', {
            actorType: 'user',
            userId,
            userEmail: updatedUser.email,
            badgeId: badge.id || badge.name,
            summary: `Badge awarded: ${badge.name || badge.id}`,
          });
        });

        Promise.all(
          result.newBadges.map((badge) => notificationEvents.onBadgeEarned(userId, badge))
        ).catch((error) => {
          console.error('[notifications] Quiz badge notification dispatch failed:', error.message);
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          user: userWithoutPassword,
          badge: result.badge,
          isNew: result.isNew,
          newBadges: result.newBadges,
        },
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Unsupported achievement type. Simulation badges are awarded via /simulations/complete.',
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
