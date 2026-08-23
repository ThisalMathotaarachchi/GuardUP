const prisma = require('../lib/prisma');
const { SIMULATION_CATALOG, CERTIFICATION_CATALOG } = require('../data/adminCatalog');

const thirtyDaysAgo = () => new Date(Date.now() - 30 * 86400000);

const buildRegistrationByMonth = (users) => {
  const registrationByMonth = {};
  users.forEach((user) => {
    if (!user.createdAt) return;
    const month = user.createdAt.toISOString().slice(0, 7);
    registrationByMonth[month] = (registrationByMonth[month] || 0) + 1;
  });
  return registrationByMonth;
};

const buildSimulationById = (runs) => {
  const simulationById = {};
  SIMULATION_CATALOG.forEach((sim) => {
    simulationById[sim.id] = { attempts: 0, completions: 0, totalScore: 0, scoreCount: 0 };
  });

  runs.forEach((run) => {
    const bucket = simulationById[run.simulationId];
    if (!bucket) return;
    bucket.attempts += 1;
    if (run.passed !== false) bucket.completions += 1;
    if (typeof run.score === 'number') {
      bucket.totalScore += run.score;
      bucket.scoreCount += 1;
    }
  });

  return simulationById;
};

const getPlatformMetrics = async () => {
  const activeSince = thirtyDaysAgo();

  const [
    totalUsers,
    activeUsers,
    totalSimulationsAggregate,
    badgesEarned,
    certCompletions,
    registrationUsers,
    simulationRuns,
    badgeGroups,
    certProgressGroups,
    certCompletionGroups,
    enrollmentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        OR: [
          { totalSimulations: { gt: 0 } },
          { hasTakenAssessment: true },
          { updatedAt: { gte: activeSince } },
        ],
      },
    }),
    prisma.user.aggregate({ _sum: { totalSimulations: true } }),
    prisma.userBadge.count(),
    prisma.certificationCompletion.count(),
    prisma.user.findMany({ select: { createdAt: true } }),
    prisma.simulationRun.findMany({
      select: { simulationId: true, score: true, passed: true },
    }),
    prisma.userBadge.groupBy({
      by: ['badgeId'],
      _count: { badgeId: true },
    }),
    prisma.certificationProgress.groupBy({
      by: ['certificationId'],
      _count: { id: true },
    }),
    prisma.certificationCompletion.groupBy({
      by: ['certificationId'],
      _count: { id: true },
    }),
    prisma.user.findMany({
      select: {
        hasTakenAssessment: true,
        totalSimulations: true,
        certificationCompletions: { select: { certificationId: true } },
      },
    }),
  ]);

  const registrationByMonth = buildRegistrationByMonth(registrationUsers);
  const simulationById = buildSimulationById(simulationRuns);

  let totalScore = 0;
  let scoreCount = 0;
  simulationRuns.forEach((run) => {
    if (typeof run.score === 'number') {
      totalScore += run.score;
      scoreCount += 1;
    }
  });

  const badgeById = {};
  badgeGroups.forEach((group) => {
    badgeById[group.badgeId] = group._count.badgeId;
  });

  const certById = {};
  CERTIFICATION_CATALOG.forEach((cert) => {
    certById[cert.id] = { enrolled: 0, completed: 0 };
  });

  certProgressGroups.forEach((group) => {
    if (certById[group.certificationId]) {
      certById[group.certificationId].enrolled = group._count.id;
    }
  });

  certCompletionGroups.forEach((group) => {
    if (certById[group.certificationId]) {
      certById[group.certificationId].completed = group._count.id;
      certById[group.certificationId].enrolled += group._count.id;
    }
  });

  certProgressGroups.forEach((group) => {
    if (certById[group.certificationId]) {
      certById[group.certificationId].enrolled = Math.max(
        certById[group.certificationId].enrolled,
        group._count.id
      );
    }
  });

  enrollmentUsers.forEach((user) => {
    const completedSet = new Set(
      user.certificationCompletions.map((item) => item.certificationId)
    );

    if ((user.totalSimulations || 0) > 0 || completedSet.size > 0) {
      CERTIFICATION_CATALOG.forEach((cert) => {
        if (!completedSet.has(cert.id) && user.hasTakenAssessment) {
          certById[cert.id].enrolled += 1;
        }
      });
    }
  });

  return {
    totalUsers,
    activeUsers,
    totalSimulations: totalSimulationsAggregate._sum.totalSimulations || 0,
    avgSimulationScore: scoreCount > 0 ? Math.round(totalScore / scoreCount) : null,
    badgesEarned,
    certCompletions,
    registrationByMonth,
    simulationById,
    badgeById,
    certById,
  };
};

const getRecentUsers = async (limit = 6) => {
  const users = await prisma.user.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { badges: true } },
      certificationCompletions: true,
      quizAttempts: { where: { passed: true } },
    },
  });

  return users;
};

const getAdminUserList = async ({ search, sort = 'newest' } = {}) => {
  const where = search
    ? {
        OR: [
          { email: { contains: String(search), mode: 'insensitive' } },
          { firstName: { contains: String(search), mode: 'insensitive' } },
          { lastName: { contains: String(search), mode: 'insensitive' } },
        ],
      }
    : {};

  let orderBy = { createdAt: 'desc' };
  if (sort === 'name') orderBy = [{ lastName: 'asc' }, { firstName: 'asc' }];
  if (sort === 'xp') orderBy = { xp: 'desc' };

  const users = await prisma.user.findMany({
    where,
    orderBy,
    include: {
      _count: { select: { badges: true } },
      certificationCompletions: true,
      quizAttempts: { where: { passed: true } },
    },
  });

  return users;
};

const getUsersCompletedLevelCounts = async () => {
  const users = await prisma.user.findMany({
    select: { simulationsCompleted: true },
  });

  const counts = {};
  SIMULATION_CATALOG.forEach((sim) => {
    counts[sim.levelKey] = users.filter((user) => {
      const completed = user.simulationsCompleted;
      return completed && typeof completed === 'object' && completed[sim.levelKey] === true;
    }).length;
  });

  return counts;
};

const getRecentSimulationActivity = async (limit = 15) => {
  const runs = await prisma.simulationRun.findMany({
    take: limit,
    orderBy: { completedAt: 'desc' },
    include: {
      user: {
        select: { id: true, email: true, firstName: true, lastName: true },
      },
    },
  });

  return runs.map((run) => ({
    userId: run.user.id,
    userName: `${run.user.firstName} ${run.user.lastName}`,
    email: run.user.email,
    simulationId: run.simulationId,
    score: run.score,
    passed: run.passed,
    completedAt: run.completedAt.toISOString(),
  }));
};

const getUserCount = async () => prisma.user.count();

module.exports = {
  getPlatformMetrics,
  getRecentUsers,
  getAdminUserList,
  getUsersCompletedLevelCounts,
  getRecentSimulationActivity,
  getUserCount,
  SIMULATION_CATALOG,
  CERTIFICATION_CATALOG,
};
