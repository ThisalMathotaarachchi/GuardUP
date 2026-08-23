const prisma = require('../lib/prisma');
const {
  VALID_QUIZ_IDS,
  QUIZ_PASS_THRESHOLDS,
  DEFAULT_QUIZ_PASS_THRESHOLD,
} = require('../data/badgeDefinitions');

const getPassThreshold = (quizId) => QUIZ_PASS_THRESHOLDS[quizId] ?? DEFAULT_QUIZ_PASS_THRESHOLD;

const toQuizResultDto = (attempt) => {
  if (!attempt) return null;

  return {
    quizId: attempt.quizId,
    percentage: attempt.percentage,
    correct: attempt.correct ?? undefined,
    incorrect: attempt.incorrect ?? undefined,
    total: attempt.total ?? undefined,
    passed: attempt.passed,
    completedAt: attempt.completedAt.toISOString(),
  };
};

const getQuizPassesMap = (attempts = []) => {
  const map = {};
  attempts.forEach((attempt) => {
    if (attempt.passed) {
      map[attempt.quizId] = {
        percentage: attempt.percentage,
        passedAt: attempt.completedAt.toISOString(),
      };
    }
  });
  return map;
};

const getAllResults = async (userId) => {
  const attempts = await prisma.quizAttempt.findMany({
    where: { userId },
    orderBy: { completedAt: 'desc' },
  });

  const results = {};
  attempts.forEach((attempt) => {
    results[attempt.quizId] = toQuizResultDto(attempt);
  });

  return results;
};

const getResult = async (userId, quizId) => {
  if (!VALID_QUIZ_IDS.has(quizId)) {
    const error = new Error('Invalid quizId');
    error.statusCode = 400;
    throw error;
  }

  const attempt = await prisma.quizAttempt.findUnique({
    where: {
      userId_quizId: { userId, quizId },
    },
  });

  return toQuizResultDto(attempt);
};

const saveAttempt = async (userId, quizId, payload) => {
  if (!VALID_QUIZ_IDS.has(quizId)) {
    const error = new Error('Invalid quizId');
    error.statusCode = 400;
    throw error;
  }

  const percentage = Number(payload.percentage);
  if (!Number.isFinite(percentage)) {
    const error = new Error('percentage is required and must be a number');
    error.statusCode = 400;
    throw error;
  }

  const threshold = getPassThreshold(quizId);
  const passed = percentage >= threshold;
  const completedAt = new Date();

  const attempt = await prisma.quizAttempt.upsert({
    where: {
      userId_quizId: { userId, quizId },
    },
    create: {
      userId,
      quizId,
      percentage: Math.round(percentage),
      correct: payload.correct ?? null,
      incorrect: payload.incorrect ?? null,
      total: payload.total ?? null,
      passed,
      answers: payload.answers ?? null,
      completedAt,
    },
    update: {
      percentage: Math.round(percentage),
      correct: payload.correct ?? null,
      incorrect: payload.incorrect ?? null,
      total: payload.total ?? null,
      passed,
      answers: payload.answers ?? null,
      completedAt,
    },
  });

  return toQuizResultDto(attempt);
};

module.exports = {
  getAllResults,
  getResult,
  saveAttempt,
  getQuizPassesMap,
  toQuizResultDto,
  getPassThreshold,
};
