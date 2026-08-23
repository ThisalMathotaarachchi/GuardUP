const notificationService = require('./notificationService');
const userService = require('./userService');
const { SIMULATION_CATALOG, CERTIFICATION_CATALOG } = require('../data/adminCatalog');
const { BADGE_DEFINITIONS } = require('../data/badgeDefinitions');

const resolveSimulationName = (simulationId) => {
  const match = SIMULATION_CATALOG.find((item) => item.id === simulationId);
  if (match) return match.title;
  return simulationId.replace(/-/g, ' ');
};

const resolveCertificationName = (certificationId) => {
  const match = CERTIFICATION_CATALOG.find((item) => item.id === certificationId);
  if (match) return match.title;
  return certificationId.replace(/-/g, ' ');
};

const resolveBadgeName = (badge) => {
  if (!badge) return 'achievement';
  if (typeof badge === 'string') {
    return BADGE_DEFINITIONS[badge]?.name || badge.replace(/_/g, ' ');
  }
  const badgeId = badge.id || badge.badgeId;
  return badge.name || BADGE_DEFINITIONS[badgeId]?.name || badgeId?.replace(/_/g, ' ') || 'achievement';
};

const safeCreateNotification = async (userId, type, title, message) => {
  try {
    const enabled = await userService.getNotificationPreference(userId);
    if (!enabled) return;

    await notificationService.createNotification(userId, type, title, message);
  } catch (error) {
    console.error('[notifications] Failed to create notification:', error.message);
  }
};

const onSimulationCompleted = async (userId, simulationId) => {
  const simulationName = resolveSimulationName(simulationId);
  await safeCreateNotification(
    userId,
    'simulation_completed',
    'Simulation completed',
    `Great work! You completed ${simulationName}.`
  );
};

const onCertificationCompleted = async (userId, certificationId) => {
  const certificationName = resolveCertificationName(certificationId);
  await safeCreateNotification(
    userId,
    'certification_completed',
    'Certification completed',
    `Congratulations! You completed ${certificationName}.`
  );
};

const onBadgeEarned = async (userId, badge) => {
  const badgeName = resolveBadgeName(badge);
  await safeCreateNotification(
    userId,
    'badge_earned',
    'New achievement unlocked',
    `You earned the ${badgeName} achievement.`
  );
};

const onLevelUp = async (userId, level) => {
  await safeCreateNotification(
    userId,
    'level_up',
    'Level up!',
    `You reached Level ${level}. Keep going!`
  );
};

module.exports = {
  onSimulationCompleted,
  onCertificationCompleted,
  onBadgeEarned,
  onLevelUp,
};
