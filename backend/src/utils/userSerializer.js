const DEFAULT_PREFERENCES = {
  notifications: true,
  privacy: false,
  twoFactor: false,
  compactMode: false,
  dataSharing: false,
  emailAlerts: true,
  pushNotifications: false,
};

const PREFERENCE_KEYS = new Set([
  'notifications',
  'privacy',
  'compactMode',
  'dataSharing',
]);

const DEFAULT_SIMULATIONS_COMPLETED = {
  beginner: false,
  advanced: false,
};

const SIMULATION_HISTORY_LIMIT = 20;

const toIsoString = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return value;
};

const toApiBadge = (dbBadge) => ({
  id: dbBadge.badgeId,
  name: dbBadge.name,
  description: dbBadge.description ?? undefined,
  category: dbBadge.category ?? undefined,
  source: dbBadge.source ?? undefined,
  icon: dbBadge.icon ?? undefined,
  tier: dbBadge.tier ?? undefined,
  earnedAt: toIsoString(dbBadge.earnedAt),
  ...(dbBadge.context && typeof dbBadge.context === 'object' ? { context: dbBadge.context } : {}),
});

const toApiSimulationRun = (run) => {
  const behaviorDataFromJson =
    typeof run.behaviorData === 'object' && run.behaviorData !== null ? run.behaviorData : {};

  return {
    simulationId: run.simulationId,
    score: run.score,
    passed: run.passed,
    xpEarned: run.xpEarned,
    completedAt: toIsoString(run.completedAt),
    behaviorData: {
      accuracy: run.accuracy ?? behaviorDataFromJson.accuracy ?? 0,
      breaches: run.breaches ?? behaviorDataFromJson.breaches ?? 0,
      totalTime: run.totalTime ?? behaviorDataFromJson.totalTime ?? 0,
      hintsUsed: run.hintsUsed ?? behaviorDataFromJson.hintsUsed ?? 0,
    },
  };
};

const mapSimulationHistory = (simulationRuns = []) => {
  const chronological = [...simulationRuns].sort(
    (a, b) => new Date(a.completedAt) - new Date(b.completedAt)
  );

  return chronological.slice(-SIMULATION_HISTORY_LIMIT).map(toApiSimulationRun);
};

const mapCertificationsCompleted = (completions = []) => {
  const map = {};
  completions.forEach((completion) => {
    map[completion.certificationId] = toIsoString(completion.completedAt);
  });
  return map;
};

const mapQuizPasses = (attempts = []) => {
  const map = {};
  attempts.forEach((attempt) => {
    if (attempt.passed) {
      map[attempt.quizId] = {
        percentage: attempt.percentage,
        passedAt: toIsoString(attempt.completedAt),
      };
    }
  });
  return map;
};

const toApiUser = (dbUser, ephemeral = {}) => {
  if (!dbUser) return null;

  const preferences = {
    ...DEFAULT_PREFERENCES,
    ...(typeof dbUser.preferences === 'object' && dbUser.preferences !== null
      ? dbUser.preferences
      : {}),
  };

  const simulationsCompleted = {
    ...DEFAULT_SIMULATIONS_COMPLETED,
    ...(typeof dbUser.simulationsCompleted === 'object' && dbUser.simulationsCompleted !== null
      ? dbUser.simulationsCompleted
      : {}),
  };

  const badges = dbUser.badges
    ? dbUser.badges.map(toApiBadge)
    : (ephemeral.badges ?? []);

  const simulationHistory = dbUser.simulationRuns
    ? mapSimulationHistory(dbUser.simulationRuns)
    : (ephemeral.simulationHistory ?? []);

  const certificationsCompleted = dbUser.certificationCompletions
    ? mapCertificationsCompleted(dbUser.certificationCompletions)
    : (ephemeral.certificationsCompleted ?? {});

  const quizPasses = dbUser.quizAttempts
    ? mapQuizPasses(dbUser.quizAttempts)
    : (ephemeral.quizPasses ?? {});

  return {
    id: dbUser.id,
    email: dbUser.email,
    password: dbUser.passwordHash,
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    role: dbUser.role,
    skillLevel: dbUser.skillLevel,
    hasTakenAssessment: dbUser.hasTakenAssessment,
    assessmentScore: dbUser.assessmentScore ?? undefined,
    xp: dbUser.xp,
    level: dbUser.level,
    streak: dbUser.streak,
    totalSimulations: dbUser.totalSimulations,
    phishingAccuracy: dbUser.phishingAccuracy,
    ransomwareAccuracy: dbUser.ransomwareAccuracy,
    highestAccuracy: dbUser.highestAccuracy,
    fastestCompletion: dbUser.fastestCompletion,
    breachesContained: dbUser.breachesContained,
    perfectScores: dbUser.perfectScores,
    zeroBreachSims: dbUser.zeroBreachSims,
    speedMaster: dbUser.speedMaster,
    avatarId: dbUser.avatarId,
    preferences,
    simulationsCompleted,
    lastSimulationAt: toIsoString(dbUser.lastSimulationAt),
    createdAt: toIsoString(dbUser.createdAt),
    updatedAt: toIsoString(dbUser.updatedAt),
    badges,
    simulationHistory,
    certificationsCompleted,
    quizPasses,
  };
};

const USER_INCLUDE = {
  badges: {
    orderBy: { earnedAt: 'asc' },
  },
  simulationRuns: {
    orderBy: { completedAt: 'desc' },
    take: SIMULATION_HISTORY_LIMIT,
  },
  certificationCompletions: {
    orderBy: { completedAt: 'asc' },
  },
  quizAttempts: {
    orderBy: { completedAt: 'desc' },
  },
};

const PERSISTED_UPDATE_FIELDS = new Set([
  'firstName',
  'lastName',
  'role',
  'skillLevel',
  'hasTakenAssessment',
  'assessmentScore',
  'xp',
  'level',
  'streak',
  'totalSimulations',
  'phishingAccuracy',
  'ransomwareAccuracy',
  'highestAccuracy',
  'fastestCompletion',
  'breachesContained',
  'perfectScores',
  'zeroBreachSims',
  'speedMaster',
  'avatarId',
  'preferences',
  'simulationsCompleted',
  'lastSimulationAt',
  'password',
  'passwordHash',
]);

const pickPersistedUpdates = (updates) => {
  const data = {};

  Object.entries(updates).forEach(([key, value]) => {
    if (!PERSISTED_UPDATE_FIELDS.has(key)) return;

    if (key === 'password') {
      data.passwordHash = value;
      return;
    }

    if (key === 'lastSimulationAt') {
      data.lastSimulationAt = value ? new Date(value) : null;
      return;
    }

    data[key] = value;
  });

  return data;
};

const pickEphemeralUpdates = (updates) => {
  const ephemeral = {};
  return ephemeral;
};

const toDbBadgeData = (userId, badge) => ({
  userId,
  badgeId: badge.id,
  name: badge.name,
  description: badge.description ?? null,
  category: badge.category ?? null,
  source: badge.source ?? null,
  icon: badge.icon ?? null,
  tier: badge.tier ?? null,
  context: badge.context ?? null,
  earnedAt: badge.earnedAt ? new Date(badge.earnedAt) : new Date(),
});

const mergeUserPreferences = (existingPreferences, incomingPreferences) => {
  const merged = {
    ...DEFAULT_PREFERENCES,
    ...(typeof existingPreferences === 'object' && existingPreferences !== null
      ? existingPreferences
      : {}),
  };

  if (typeof incomingPreferences !== 'object' || incomingPreferences === null) {
    merged.twoFactor = false;
    return merged;
  }

  PREFERENCE_KEYS.forEach((key) => {
    if (incomingPreferences[key] !== undefined) {
      merged[key] = Boolean(incomingPreferences[key]);
    }
  });

  merged.twoFactor = false;
  return merged;
};

module.exports = {
  toApiUser,
  toApiBadge,
  toApiSimulationRun,
  mapSimulationHistory,
  pickPersistedUpdates,
  pickEphemeralUpdates,
  toDbBadgeData,
  USER_INCLUDE,
  SIMULATION_HISTORY_LIMIT,
  DEFAULT_PREFERENCES,
  DEFAULT_SIMULATIONS_COMPLETED,
  mergeUserPreferences,
};
