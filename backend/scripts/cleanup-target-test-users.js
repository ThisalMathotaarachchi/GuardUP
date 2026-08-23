/**
 * Targeted cleanup: delete only two confirmed zero-activity test users.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const prisma = require('../src/lib/prisma');

const TARGET_EMAILS = [
  'phase2test3542494@example.com',
  'phase2test689686383@example.com',
];

const SAFE_USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  createdAt: true,
  level: true,
  totalSimulations: true,
};

const getActivityCounts = async (userId) => {
  const [
    simulationRuns,
    badges,
    certProgress,
    certCompletions,
    quizAttempts,
    notifications,
    auditEvents,
  ] = await Promise.all([
    prisma.simulationRun.count({ where: { userId } }),
    prisma.userBadge.count({ where: { userId } }),
    prisma.certificationProgress.count({ where: { userId } }),
    prisma.certificationCompletion.count({ where: { userId } }),
    prisma.quizAttempt.count({ where: { userId } }),
    prisma.notification.count({ where: { userId } }),
    prisma.auditEvent.count({ where: { userId } }),
  ]);

  return {
    simulationRuns,
    badges,
    certProgress,
    certCompletions,
    quizAttempts,
    notifications,
    auditEvents,
    total:
      simulationRuns
      + badges
      + certProgress
      + certCompletions
      + quizAttempts
      + notifications
      + auditEvents,
  };
};

const hasZeroActivity = (counts) => counts.total === 0;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim() || null;

  const beforeUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: SAFE_USER_SELECT,
  });

  const beforeTotals = {
    users: beforeUsers.length,
    simulationRuns: await prisma.simulationRun.count(),
    notifications: await prisma.notification.count(),
    badges: await prisma.userBadge.count(),
    certProgress: await prisma.certificationProgress.count(),
    certCompletions: await prisma.certificationCompletion.count(),
    certActivities: await prisma.certificationActivityCompletion.count(),
    quizAttempts: await prisma.quizAttempt.count(),
    auditEvents: await prisma.auditEvent.count(),
  };

  const targetUsers = await prisma.user.findMany({
    where: { email: { in: TARGET_EMAILS } },
    select: { ...SAFE_USER_SELECT },
  });

  if (targetUsers.length !== TARGET_EMAILS.length) {
    const found = new Set(targetUsers.map((user) => user.email.toLowerCase()));
    const missing = TARGET_EMAILS.filter((email) => !found.has(email.toLowerCase()));
    throw new Error(`Expected 2 target users, found ${targetUsers.length}. Missing: ${missing.join(', ') || 'none'}`);
  }

  for (const user of targetUsers) {
    if (user.email.toLowerCase() === adminEmail?.toLowerCase()) {
      throw new Error(`Refusing to delete configured admin email: ${user.email}`);
    }

    const counts = await getActivityCounts(user.id);
    if (!hasZeroActivity(counts)) {
      throw new Error(`Refusing to delete ${user.email}; linked activity detected: ${JSON.stringify(counts)}`);
    }
  }

  const deletedUsers = [];
  for (const email of TARGET_EMAILS) {
    const deleted = await prisma.user.delete({
      where: { email },
      select: SAFE_USER_SELECT,
    });
    deletedUsers.push(deleted);
  }

  const afterUsers = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: SAFE_USER_SELECT,
  });

  const afterTotals = {
    users: afterUsers.length,
    simulationRuns: await prisma.simulationRun.count(),
    notifications: await prisma.notification.count(),
    badges: await prisma.userBadge.count(),
    certProgress: await prisma.certificationProgress.count(),
    certCompletions: await prisma.certificationCompletion.count(),
    certActivities: await prisma.certificationActivityCompletion.count(),
    quizAttempts: await prisma.quizAttempt.count(),
    auditEvents: await prisma.auditEvent.count(),
  };

  const remainingBeforeIds = new Set(
    beforeUsers
      .filter((user) => !TARGET_EMAILS.includes(user.email.toLowerCase()))
      .map((user) => user.id)
  );
  const remainingAfter = afterUsers.filter((user) => remainingBeforeIds.has(user.id));
  const unchangedRemaining = remainingAfter.length === beforeUsers.length - TARGET_EMAILS.length
    && remainingAfter.every((user) => {
      const before = beforeUsers.find((item) => item.id === user.id);
      return before
        && before.email === user.email
        && before.firstName === user.firstName
        && before.lastName === user.lastName
        && before.role === user.role
        && before.level === user.level
        && before.totalSimulations === user.totalSimulations;
    });

  const targetStillExist = await prisma.user.count({
    where: { email: { in: TARGET_EMAILS } },
  });

  const healthCheck = await prisma.$queryRaw`SELECT 1 AS ok`;

  console.log(JSON.stringify({
    verification: {
      totalUsersIs8: afterTotals.users === 8,
      targetEmailsRemoved: targetStillExist === 0,
      remainingUsersUnchanged: unchangedRemaining,
      envAdminEmailConfigured: adminEmail,
      envAdminNotInDeletedUsers: !deletedUsers.some((user) => user.email.toLowerCase() === adminEmail?.toLowerCase()),
      databaseQueryWorks: Array.isArray(healthCheck) && Number(healthCheck[0]?.ok) === 1,
      noUnexpectedCascadeChanges:
        beforeTotals.simulationRuns === afterTotals.simulationRuns
        && beforeTotals.notifications === afterTotals.notifications
        && beforeTotals.badges === afterTotals.badges
        && beforeTotals.certProgress === afterTotals.certProgress
        && beforeTotals.certCompletions === afterTotals.certCompletions
        && beforeTotals.certActivities === afterTotals.certActivities
        && beforeTotals.quizAttempts === afterTotals.quizAttempts
        && beforeTotals.auditEvents === afterTotals.auditEvents,
    },
    usersBefore: beforeTotals.users,
    usersDeleted: deletedUsers.length,
    usersAfter: afterTotals.users,
    deletedUserEmails: deletedUsers.map((user) => user.email),
    remainingUserEmails: afterUsers.map((user) => ({
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      createdAt: user.createdAt.toISOString().slice(0, 10),
      level: user.level,
      totalSimulations: user.totalSimulations,
    })),
    tableTotalsBefore: beforeTotals,
    tableTotalsAfter: afterTotals,
    unexpectedChanges:
      beforeTotals.simulationRuns !== afterTotals.simulationRuns
      || beforeTotals.notifications !== afterTotals.notifications
      || beforeTotals.badges !== afterTotals.badges
      || beforeTotals.certProgress !== afterTotals.certProgress
      || beforeTotals.certCompletions !== afterTotals.certCompletions
      || beforeTotals.certActivities !== afterTotals.certActivities
      || beforeTotals.quizAttempts !== afterTotals.quizAttempts
      || beforeTotals.auditEvents !== afterTotals.auditEvents
        ? {
            simulationRuns: { before: beforeTotals.simulationRuns, after: afterTotals.simulationRuns },
            notifications: { before: beforeTotals.notifications, after: afterTotals.notifications },
            badges: { before: beforeTotals.badges, after: afterTotals.badges },
            certProgress: { before: beforeTotals.certProgress, after: afterTotals.certProgress },
            certCompletions: { before: beforeTotals.certCompletions, after: afterTotals.certCompletions },
            certActivities: { before: beforeTotals.certActivities, after: afterTotals.certActivities },
            quizAttempts: { before: beforeTotals.quizAttempts, after: afterTotals.quizAttempts },
            auditEvents: { before: beforeTotals.auditEvents, after: afterTotals.auditEvents },
          }
        : null,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error('Cleanup failed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
