const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const badgeService = require('./badgeService');
const {
  SIMULATION_BADGE_IDS,
} = require('../data/badgeDefinitions');
const {
  toApiUser,
  pickPersistedUpdates,
  pickEphemeralUpdates,
  toDbBadgeData,
  USER_INCLUDE,
  SIMULATION_HISTORY_LIMIT,
  toApiSimulationRun,
  DEFAULT_PREFERENCES,
  DEFAULT_SIMULATIONS_COMPLETED,
} = require('../utils/userSerializer');

const calculateLevel = (xp) => Math.floor(xp / 100) + 1;

const resolveBadgeId = (badge) => (typeof badge === 'string' ? badge : badge?.id);

const simulationBadgeIdSet = new Set(SIMULATION_BADGE_IDS);

const completeSimulation = async (userId, { simulationId, level, results }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: USER_INCLUDE,
  });

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const apiUser = toApiUser(user);

  const score = results.score ?? 0;
  const xpEarned = results.xpEarned ?? 0;
  const passScore = simulationId.includes('phishing') ? 60 : 50;
  const passed = results.passed ?? score >= passScore;

  const behaviorData = results.behaviorData ?? {
    accuracy: results.accuracy ?? 0,
    breaches: results.breaches ?? 0,
    totalTime: results.totalTime ?? 0,
    timeLimit: results.timeLimit ?? (simulationId.includes('phishing') ? 300 : 420),
    hintsUsed: results.hintsUsed ?? 0,
    breachesContained: results.recovered ? 1 : 0,
  };

  const normalizedLevel = (level || '').toUpperCase();
  const isPhishing = normalizedLevel === 'BEGINNER' || simulationId.includes('phishing');
  const timeRatio = behaviorData.timeLimit
    ? behaviorData.totalTime / behaviorData.timeLimit
    : 1;

  const previousLevel = apiUser.level || 1;
  const wasSimulationPreviouslyCompleted = Boolean(apiUser.simulationsCompleted?.[simulationId]);

  const newStreak = score >= 60 ? (apiUser.streak || 0) + 1 : 0;
  const newXp = (apiUser.xp || 0) + (xpEarned || 0);
  const newLevel = calculateLevel(newXp);

  const simulationsCompleted = {
    ...(apiUser.simulationsCompleted || {}),
    [simulationId]: true,
  };

  if (isPhishing) {
    simulationsCompleted.beginner = true;
  } else {
    simulationsCompleted.advanced = true;
  }

  const stats = {
    totalSimulations: (apiUser.totalSimulations || 0) + 1,
    phishingAccuracy: isPhishing
      ? Math.max(score, apiUser.phishingAccuracy || 0)
      : (apiUser.phishingAccuracy || 0),
    ransomwareAccuracy: !isPhishing
      ? Math.max(score, apiUser.ransomwareAccuracy || 0)
      : (apiUser.ransomwareAccuracy || 0),
    highestAccuracy: Math.max(score, apiUser.highestAccuracy || 0),
    fastestCompletion: Math.min(timeRatio, apiUser.fastestCompletion ?? 1),
    breachesContained: (apiUser.breachesContained || 0) + (behaviorData.breachesContained || 0),
    streak: newStreak,
    perfectScores: (apiUser.perfectScores || 0) + (score >= 100 ? 1 : 0),
    zeroBreachSims: (apiUser.zeroBreachSims || 0) + (behaviorData.breaches === 0 ? 1 : 0),
    speedMaster: (apiUser.speedMaster || 0) + (timeRatio < 0.25 && score >= 80 ? 1 : 0),
  };

  const { badges, newBadges } = badgeService.computeSimulationBadges(stats, apiUser.badges || []);

  const completedAt = new Date();
  const historyEntry = {
    simulationId,
    score,
    passed,
    xpEarned,
    completedAt: completedAt.toISOString(),
    behaviorData: {
      accuracy: behaviorData.accuracy,
      breaches: behaviorData.breaches,
      totalTime: behaviorData.totalTime,
      hintsUsed: behaviorData.hintsUsed,
    },
  };

  const mergedSimulationBadgeIds = new Set(
    badges
      .filter((badge) => simulationBadgeIdSet.has(resolveBadgeId(badge)))
      .map(resolveBadgeId)
  );

  const simulationBadgeIdsToRemove = SIMULATION_BADGE_IDS.filter(
    (badgeId) => !mergedSimulationBadgeIds.has(badgeId)
  );

  await prisma.$transaction(async (tx) => {
    await tx.simulationRun.create({
      data: {
        userId,
        simulationId,
        score,
        passed,
        xpEarned,
        accuracy: behaviorData.accuracy,
        breaches: behaviorData.breaches,
        totalTime: behaviorData.totalTime,
        hintsUsed: behaviorData.hintsUsed,
        behaviorData: {
          accuracy: behaviorData.accuracy,
          breaches: behaviorData.breaches,
          totalTime: behaviorData.totalTime,
          hintsUsed: behaviorData.hintsUsed,
          timeLimit: behaviorData.timeLimit,
          breachesContained: behaviorData.breachesContained,
        },
        completedAt,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
        streak: newStreak,
        simulationsCompleted,
        totalSimulations: stats.totalSimulations,
        phishingAccuracy: stats.phishingAccuracy,
        ransomwareAccuracy: stats.ransomwareAccuracy,
        highestAccuracy: stats.highestAccuracy,
        fastestCompletion: stats.fastestCompletion,
        breachesContained: stats.breachesContained,
        perfectScores: stats.perfectScores,
        zeroBreachSims: stats.zeroBreachSims,
        speedMaster: stats.speedMaster,
        lastSimulationAt: completedAt,
      },
    });

    if (simulationBadgeIdsToRemove.length > 0) {
      await tx.userBadge.deleteMany({
        where: {
          userId,
          badgeId: { in: simulationBadgeIdsToRemove },
        },
      });
    }

    for (const badge of badges) {
      const badgeId = resolveBadgeId(badge);
      if (!simulationBadgeIdSet.has(badgeId)) continue;

      await tx.userBadge.upsert({
        where: {
          userId_badgeId: { userId, badgeId },
        },
        create: toDbBadgeData(userId, badge),
        update: {
          name: badge.name,
          description: badge.description ?? null,
          category: badge.category ?? null,
          source: badge.source ?? null,
          icon: badge.icon ?? null,
          tier: badge.tier ?? null,
          context: badge.context ?? null,
        },
      });
    }
  });

  const updatedUserRecord = await prisma.user.findUnique({
    where: { id: userId },
    include: USER_INCLUDE,
  });

  const updatedUser = toApiUser(updatedUserRecord);

  return {
    user: updatedUser,
    newBadges,
    historyEntry,
    meta: {
      userId,
      userEmail: updatedUser.email,
      simulationId,
      score,
      passed,
      wasFirstPass: passed && !wasSimulationPreviouslyCompleted,
      levelUp: newLevel > previousLevel,
      newLevel,
    },
  };
};

const userService = {
  findByEmail: async (email) => {
    const user = await prisma.user.findUnique({
      where: { email },
      include: USER_INCLUDE,
    });
    return toApiUser(user);
  },

  findById: async (id) => {
    const user = await prisma.user.findUnique({
      where: { id },
      include: USER_INCLUDE,
    });
    return toApiUser(user);
  },

  create: async (userData) => {
    try {
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          passwordHash: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role || 'USER',
          skillLevel: userData.skillLevel || 'NOT_ASSIGNED',
          xp: userData.xp || 0,
          level: userData.level || 1,
          streak: userData.streak || 0,
          preferences: userData.preferences || DEFAULT_PREFERENCES,
          simulationsCompleted: userData.simulationsCompleted || DEFAULT_SIMULATIONS_COMPLETED,
          avatarId: userData.avatarId || 'defender',
        },
        include: USER_INCLUDE,
      });

      return toApiUser(user);
    } catch (error) {
      if (error.code === 'P2002') {
        const duplicateError = new Error('Email already registered');
        duplicateError.statusCode = 400;
        throw duplicateError;
      }
      throw error;
    }
  },

  update: async (id, updates) => {
    const persisted = pickPersistedUpdates(updates);
    const ephemeral = pickEphemeralUpdates(updates);

    try {
      const user = await prisma.user.update({
        where: { id },
        data: persisted,
        include: USER_INCLUDE,
      });

      return toApiUser(user, ephemeral);
    } catch (error) {
      if (error.code === 'P2025') {
        return null;
      }
      throw error;
    }
  },

  getAll: async () => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      include: USER_INCLUDE,
    });

    return users.map((user) => toApiUser(user));
  },

  getSimulationHistory: async (userId) => {
    const runs = await prisma.simulationRun.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: SIMULATION_HISTORY_LIMIT,
    });

    return runs.reverse().map(toApiSimulationRun);
  },

  completeSimulation,

  changePassword: async (userId, currentPassword, newPassword) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isCurrentValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      const error = new Error('Current password is incorrect.');
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashedPassword },
    });
  },

  deleteAccount: async (userId) => {
    try {
      await prisma.user.delete({ where: { id: userId } });
      return true;
    } catch (error) {
      if (error.code === 'P2025') {
        return false;
      }
      throw error;
    }
  },

  getNotificationPreference: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { preferences: true },
    });

    if (!user) return false;

    const preferences = {
      ...DEFAULT_PREFERENCES,
      ...(typeof user.preferences === 'object' && user.preferences !== null
        ? user.preferences
        : {}),
    };

    return preferences.notifications !== false;
  },
};

module.exports = userService;
