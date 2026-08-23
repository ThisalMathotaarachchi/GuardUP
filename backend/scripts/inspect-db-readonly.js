/**
 * Read-only database inspection for production prep.
 * DO NOT modify data.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const prisma = require('../src/lib/prisma');

const countSimulationsCompleted = (simulationsCompleted) => {
  if (!simulationsCompleted || typeof simulationsCompleted !== 'object') return 0;
  return Object.values(simulationsCompleted).filter(Boolean).length;
};

const summarizeActivity = (counts) => {
  const parts = [];
  if (counts.simulationRuns) parts.push(`${counts.simulationRuns} sim run(s)`);
  if (counts.badges) parts.push(`${counts.badges} badge(s)`);
  if (counts.certProgress) parts.push(`${counts.certProgress} cert progress`);
  if (counts.certCompletions) parts.push(`${counts.certCompletions} cert completion(s)`);
  if (counts.certActivities) parts.push(`${counts.certActivities} cert activity(ies)`);
  if (counts.quizAttempts) parts.push(`${counts.quizAttempts} quiz attempt(s)`);
  if (counts.notifications) parts.push(`${counts.notifications} notification(s)`);
  if (counts.auditEvents) parts.push(`${counts.auditEvents} audit event(s)`);
  if (parts.length === 0) return 'No linked activity';
  return parts.join(', ');
};

const totalAffectedRecords = (counts) =>
  counts.simulationRuns
  + counts.badges
  + counts.certProgress
  + counts.certCompletions
  + counts.certActivities
  + counts.quizAttempts
  + counts.notifications
  + counts.auditEvents;

const recommend = (user, counts, adminEmail) => {
  const email = user.email.toLowerCase();
  const isAdmin = user.role === 'ADMIN' || email === adminEmail.toLowerCase();

  if (isAdmin) return 'KEEP';

  const hasMeaningfulActivity =
    counts.simulationRuns > 0
    || counts.badges > 0
    || counts.certCompletions > 0
    || counts.quizAttempts > 0
    || user.totalSimulations > 0
    || user.xp > 0
    || user.level > 1;

  const looksLikeObviousTestAccount =
    /^(test|demo|temp|fake|sample|dev|qa|user\d+|admin\d+)@/i.test(email)
    || /^(test|demo|temp|fake|sample|dev|qa)\d*$/i.test(`${user.firstName}${user.lastName}`.replace(/\s/g, ''))
    || /^test/i.test(user.firstName)
    || email.includes('+test')
    || email.includes('mailinator')
    || email.includes('tempmail')
    || email.includes('example.com');

  if (looksLikeObviousTestAccount && !hasMeaningfulActivity) {
    return 'TEST ACCOUNT — SAFE TO DELETE';
  }

  if (looksLikeObviousTestAccount && hasMeaningfulActivity) {
    return 'NEEDS CONFIRMATION';
  }

  if (!hasMeaningfulActivity && user.createdAt) {
    const ageDays = (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays < 14 && user.totalSimulations === 0 && counts.simulationRuns === 0) {
      return 'NEEDS CONFIRMATION';
    }
  }

  return 'KEEP';
};

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || '';

  const [
    users,
    roleGroups,
    totalSimulationRuns,
    totalNotifications,
    totalBadges,
    totalCertProgress,
    totalCertCompletions,
    totalCertActivities,
    totalQuizAttempts,
    totalAuditEvents,
  ] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        level: true,
        xp: true,
        totalSimulations: true,
        simulationsCompleted: true,
        _count: {
          select: {
            simulationRuns: true,
            badges: true,
            certificationProgress: true,
            certificationCompletions: true,
            quizAttempts: true,
            notifications: true,
            auditEvents: true,
          },
        },
        certificationProgress: {
          select: {
            _count: { select: { activities: true } },
          },
        },
      },
    }),
    prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
    prisma.simulationRun.count(),
    prisma.notification.count(),
    prisma.userBadge.count(),
    prisma.certificationProgress.count(),
    prisma.certificationCompletion.count(),
    prisma.certificationActivityCompletion.count(),
    prisma.quizAttempt.count(),
    prisma.auditEvent.count(),
  ]);

  const userRows = users.map((user) => {
    const certActivities = user.certificationProgress.reduce(
      (sum, progress) => sum + progress._count.activities,
      0
    );

    const counts = {
      simulationRuns: user._count.simulationRuns,
      badges: user._count.badges,
      certProgress: user._count.certificationProgress,
      certCompletions: user._count.certificationCompletions,
      certActivities,
      quizAttempts: user._count.quizAttempts,
      notifications: user._count.notifications,
      auditEvents: user._count.auditEvents,
    };

    return {
      id: user.id,
      user: `${user.firstName} ${user.lastName} <${user.email}>`,
      role: user.role,
      created: user.createdAt.toISOString().slice(0, 10),
      level: user.level,
      xp: user.xp,
      totalSimulations: user.totalSimulations,
      simulationsCompletedMapCount: countSimulationsCompleted(user.simulationsCompleted),
      activity: summarizeActivity(counts),
      recommendation: recommend(user, counts, adminEmail),
      affectedRecords: totalAffectedRecords(counts),
      counts,
    };
  });

  console.log(JSON.stringify({
    summary: {
      totalUsers: users.length,
      usersByRole: Object.fromEntries(roleGroups.map((g) => [g.role, g._count._all])),
      totalSimulationRuns,
      totalNotifications,
      totalBadges,
      totalCertificationProgress: totalCertProgress,
      totalCertificationCompletions: totalCertCompletions,
      totalCertificationActivities: totalCertActivities,
      totalQuizAttempts,
      totalAuditEvents,
      adminEmailConfigured: adminEmail || null,
    },
    users: userRows,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error('Inspection failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
