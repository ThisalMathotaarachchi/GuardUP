const prisma = require('../lib/prisma');
const { VALID_CERTIFICATION_IDS } = require('../data/badgeDefinitions');
const {
  getCertificationActivityIds,
  CERTIFICATION_QUIZ_ACTIVITY_MAP,
  FINAL_ASSESSMENT_ACTIVITY_IDS,
  DEFAULT_QUIZ_PASS_THRESHOLD,
} = require('../data/certificationCatalog');
const { QUIZ_PASS_THRESHOLDS } = require('../data/badgeDefinitions');

const toProgressDto = (progress) => {
  if (!progress) {
    return {
      certificationId: null,
      completedActivityIds: [],
      startedAt: null,
      completedAt: null,
    };
  }

  return {
    certificationId: progress.certificationId,
    completedActivityIds: progress.activities.map((activity) => activity.activityId),
    startedAt: progress.startedAt ? progress.startedAt.toISOString() : null,
    completedAt: progress.completedAt ? progress.completedAt.toISOString() : null,
  };
};

const getQuizPassThreshold = (quizId) => QUIZ_PASS_THRESHOLDS[quizId] ?? DEFAULT_QUIZ_PASS_THRESHOLD;

const isQuizActivityPassed = async (userId, activityId) => {
  const quizId = CERTIFICATION_QUIZ_ACTIVITY_MAP[activityId];
  if (!quizId) return false;

  const attempt = await prisma.quizAttempt.findUnique({
    where: {
      userId_quizId: { userId, quizId },
    },
  });

  if (!attempt) return false;
  const threshold = getQuizPassThreshold(quizId);
  return attempt.passed && attempt.percentage >= threshold;
};

const isActivityComplete = async (userId, activityId, completedActivityIds) => {
  if (completedActivityIds.includes(activityId)) return true;
  if (FINAL_ASSESSMENT_ACTIVITY_IDS.has(activityId)) return false;
  if (CERTIFICATION_QUIZ_ACTIVITY_MAP[activityId]) {
    return isQuizActivityPassed(userId, activityId);
  }
  return false;
};

const isCertificationCompleted = async (userId, certificationId, progressRecord) => {
  const activityIds = getCertificationActivityIds(certificationId);
  if (activityIds.length === 0) return false;

  if (progressRecord?.completedAt) return true;

  const completedActivityIds = progressRecord?.activities?.map((item) => item.activityId) || [];

  const results = await Promise.all(
    activityIds.map((activityId) => isActivityComplete(userId, activityId, completedActivityIds))
  );

  return results.every(Boolean);
};

const getAllProgress = async (userId) => {
  const records = await prisma.certificationProgress.findMany({
    where: { userId },
    include: { activities: true },
    orderBy: { certificationId: 'asc' },
  });

  return records.map(toProgressDto);
};

const getProgress = async (userId, certificationId) => {
  if (!VALID_CERTIFICATION_IDS.has(certificationId)) {
    const error = new Error('Invalid certificationId');
    error.statusCode = 400;
    throw error;
  }

  const progress = await prisma.certificationProgress.findUnique({
    where: {
      userId_certificationId: { userId, certificationId },
    },
    include: { activities: true },
  });

  return toProgressDto(progress || { certificationId, activities: [] });
};

const markActivityComplete = async (userId, certificationId, activityId) => {
  if (!VALID_CERTIFICATION_IDS.has(certificationId)) {
    const error = new Error('Invalid certificationId');
    error.statusCode = 400;
    throw error;
  }

  const activityIds = getCertificationActivityIds(certificationId);
  if (!activityIds.includes(activityId)) {
    const error = new Error('Invalid activityId');
    error.statusCode = 400;
    throw error;
  }

  const result = await prisma.$transaction(async (tx) => {
    let progress = await tx.certificationProgress.findUnique({
      where: {
        userId_certificationId: { userId, certificationId },
      },
      include: { activities: true },
    });

    const now = new Date();
    const hadCompletedAt = Boolean(progress?.completedAt);

    if (!progress) {
      progress = await tx.certificationProgress.create({
        data: {
          userId,
          certificationId,
          startedAt: now,
          activities: {
            create: { activityId },
          },
        },
        include: { activities: true },
      });
    } else {
      const alreadyComplete = progress.activities.some((item) => item.activityId === activityId);
      if (!alreadyComplete) {
        await tx.certificationActivityCompletion.create({
          data: {
            progressId: progress.id,
            activityId,
          },
        });
      }

      if (!progress.startedAt) {
        progress = await tx.certificationProgress.update({
          where: { id: progress.id },
          data: { startedAt: now },
          include: { activities: true },
        });
      } else {
        progress = await tx.certificationProgress.findUnique({
          where: { id: progress.id },
          include: { activities: true },
        });
      }
    }

    const completed = await isCertificationCompleted(userId, certificationId, progress);
    let justCompleted = false;

    if (completed && !hadCompletedAt) {
      justCompleted = true;
      progress = await tx.certificationProgress.update({
        where: { id: progress.id },
        data: {
          completedAt: progress.completedAt ?? now,
        },
        include: { activities: true },
      });
    }

    return {
      progress: toProgressDto(progress),
      justCompleted,
    };
  });

  return result;
};

const recordCertificationCompletion = async (userId, certificationId) => {
  const existing = await prisma.certificationCompletion.findUnique({
    where: {
      userId_certificationId: { userId, certificationId },
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.certificationCompletion.create({
    data: {
      userId,
      certificationId,
    },
  });
};

const getCertificationsCompletedMap = (completions = []) => {
  const map = {};
  completions.forEach((completion) => {
    map[completion.certificationId] = completion.completedAt.toISOString();
  });
  return map;
};

module.exports = {
  getAllProgress,
  getProgress,
  markActivityComplete,
  recordCertificationCompletion,
  getCertificationsCompletedMap,
  toProgressDto,
};
