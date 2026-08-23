const prisma = require('../lib/prisma');
const {
  BADGE_DEFINITIONS,
  SIMULATION_BADGE_IDS,
} = require('../data/badgeDefinitions');
const { toApiBadge, toDbBadgeData, toApiUser, USER_INCLUDE } = require('../utils/userSerializer');

const simulationBadgeIdSet = new Set(SIMULATION_BADGE_IDS);

const resolveBadgeId = (badge) => (typeof badge === 'string' ? badge : badge?.id);

const toStoredBadge = (definition, existingBadge = null) => ({
  id: definition.id,
  name: definition.name,
  description: definition.description,
  category: definition.category,
  source: definition.source,
  icon: definition.icon,
  tier: definition.tier,
  earnedAt: existingBadge?.earnedAt || new Date().toISOString(),
});

const getBadgeDefinition = (badgeId) => BADGE_DEFINITIONS[badgeId] || null;

const getAllBadgeDefinitions = () => ({ ...BADGE_DEFINITIONS });

const hasBadge = (user, badgeId) => {
  const badges = user?.badges || [];
  return badges.some((b) => resolveBadgeId(b) === badgeId);
};

const reloadUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: USER_INCLUDE,
  });
  return toApiUser(user);
};

const getUserBadges = async (userId) => {
  const user = await reloadUser(userId);
  return user?.badges || [];
};

const awardBadge = async (userId, badgeId, metadata = {}) => {
  const definition = getBadgeDefinition(badgeId);
  if (!definition) {
    const error = new Error(`Unknown badge: ${badgeId}`);
    error.statusCode = 400;
    throw error;
  }

  const existing = await prisma.userBadge.findUnique({
    where: {
      userId_badgeId: { userId, badgeId },
    },
  });

  if (existing) {
    const user = await reloadUser(userId);
    return {
      user,
      badge: toApiBadge(existing),
      isNew: false,
    };
  }

  const badge = toStoredBadge(definition, null);
  if (metadata.context) badge.context = metadata.context;

  await prisma.userBadge.create({
    data: toDbBadgeData(userId, badge),
  });

  const user = await reloadUser(userId);

  return {
    user,
    badge,
    isNew: true,
  };
};

const awardBadges = async (userId, badgeIds, metadata = {}) => {
  let user = await reloadUser(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const newlyAwarded = [];

  for (const badgeId of badgeIds) {
    const result = await awardBadge(userId, badgeId, metadata);
    user = result.user;
    if (result.isNew) newlyAwarded.push(result.badge);
  }

  return {
    user,
    badge: newlyAwarded[0] || null,
    isNew: newlyAwarded.length > 0,
    newBadges: newlyAwarded,
  };
};

const checkSimulationBadgeEarned = (badgeId, stats) => {
  switch (badgeId) {
    case 'first_sim': return stats.totalSimulations >= 1;
    case 'phishing_spotter': return stats.phishingAccuracy >= 80;
    case 'ransomware_slayer': return stats.ransomwareAccuracy >= 80;
    case 'security_sentinel': return stats.highestAccuracy >= 90;
    case 'speed_demon': return stats.fastestCompletion < 0.5;
    case 'perfect_recovery': return stats.breachesContained > 0;
    case 'on_a_roll': return stats.streak >= 3;
    case 'unstoppable': return stats.streak >= 5;
    case 'legendary': return stats.streak >= 10;
    case 'bronze_guardian': return stats.totalSimulations >= 5;
    case 'silver_sentinel': return stats.totalSimulations >= 15;
    case 'gold_guardian': return stats.totalSimulations >= 30;
    case 'master_of_cyber': return stats.totalSimulations >= 50;
    case 'perfect_score': return stats.perfectScores > 0;
    case 'zero_breach_hero': return stats.zeroBreachSims > 0;
    case 'speed_master': return stats.speedMaster > 0;
    case 'all_rounder': return stats.phishingAccuracy >= 80 && stats.ransomwareAccuracy >= 80;
    default: return false;
  }
};


const computeSimulationBadges = (stats, existingBadges = []) => {
  const nonSimulationBadges = existingBadges.filter(
    (b) => !simulationBadgeIdSet.has(resolveBadgeId(b))
  );

  const existingSimBadges = existingBadges.filter(
    (b) => simulationBadgeIdSet.has(resolveBadgeId(b))
  );
  const existingSimIds = new Set(existingSimBadges.map(resolveBadgeId));

  const earnedSimBadges = [];
  const newBadges = [];

  SIMULATION_BADGE_IDS.forEach((badgeId) => {
    if (!checkSimulationBadgeEarned(badgeId, stats)) return;

    const definition = getBadgeDefinition(badgeId);
    const prior = existingSimBadges.find((b) => resolveBadgeId(b) === badgeId);
    const badge = toStoredBadge(definition, prior);
    const isNew = !existingSimIds.has(badgeId);

    earnedSimBadges.push({ ...badge, isNew });
    if (isNew) newBadges.push(badge);
  });

  const mergedBadges = [
    ...nonSimulationBadges,
    ...earnedSimBadges.map(({ isNew, ...badge }) => badge),
  ];

  return { badges: mergedBadges, newBadges };
};

module.exports = {
  getBadgeDefinition,
  getAllBadgeDefinitions,
  hasBadge,
  awardBadge,
  awardBadges,
  getUserBadges,
  computeSimulationBadges,
  checkSimulationBadgeEarned,
};
