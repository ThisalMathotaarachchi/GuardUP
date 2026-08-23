const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'refreshToken',
  'secret',
  'hash',
]);

const stripSensitive = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const out = {};
  Object.keys(obj).forEach((key) => {
    if (SENSITIVE_KEYS.has(key)) return;
    out[key] = obj[key];
  });
  return out;
};

const toAdminUserSummary = (user) => {
  const certificationsCompleted = user.certificationsCompleted
    || (user.certificationCompletions || []).reduce((acc, item) => {
      acc[item.certificationId] = item.completedAt instanceof Date
        ? item.completedAt.toISOString()
        : item.completedAt;
      return acc;
    }, {});

  const quizPasses = user.quizPasses
    || (user.quizAttempts || []).reduce((acc, item) => {
      if (item.passed) {
        acc[item.quizId] = {
          percentage: item.percentage,
          passedAt: item.completedAt instanceof Date
            ? item.completedAt.toISOString()
            : item.completedAt,
        };
      }
      return acc;
    }, {});

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    skillLevel: user.skillLevel,
    hasTakenAssessment: Boolean(user.hasTakenAssessment),
    xp: user.xp || 0,
    level: user.level || 1,
    streak: user.streak || 0,
    totalSimulations: user.totalSimulations || 0,
    badgeCount: user.badgeCount ?? user._count?.badges ?? (user.badges || []).length,
    simulationsCompleted: user.simulationsCompleted || {},
    certificationsCompleted,
    quizPasses,
    createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
    updatedAt: user.updatedAt instanceof Date ? user.updatedAt.toISOString() : user.updatedAt,
    status: user.hasTakenAssessment ? 'active' : 'pending_assessment',
  };
};

const toAdminUserDetail = (user) => ({
  ...toAdminUserSummary(user),
  badges: (user.badges || []).map((b) => stripSensitive(typeof b === 'string' ? { id: b, name: b } : b)),
  simulationHistory: (user.simulationHistory || []).map((entry) => ({
    simulationId: entry.simulationId,
    score: entry.score,
    passed: entry.passed,
    completedAt: entry.completedAt,
    duration: entry.duration,
  })),
  preferences: {
    notifications: user.preferences?.notifications ?? true,
    twoFactor: user.preferences?.twoFactor ?? false,
  },
  stats: {
    phishingAccuracy: user.phishingAccuracy || 0,
    ransomwareAccuracy: user.ransomwareAccuracy || 0,
    highestAccuracy: user.highestAccuracy || 0,
    perfectScores: user.perfectScores || 0,
    zeroBreachSims: user.zeroBreachSims || 0,
    breachesContained: user.breachesContained || 0,
  },
});

module.exports = {
  toAdminUserSummary,
  toAdminUserDetail,
};
