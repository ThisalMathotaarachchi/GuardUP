import { buildAccountStorageKey } from './accountStorageKey';
import {
  fetchAllQuizResults,
  saveQuizAttempt,
} from '../services/quizProgressApi';

const STORAGE_PREFIX = 'guardup-quiz-results';
const IMPORT_FLAG_PREFIX = 'guardup-quiz-imported';


let quizResultsCache = {};

const getLegacyStorageKey = () => buildAccountStorageKey(STORAGE_PREFIX);

const readLegacyQuizStore = () => {
  try {
    return JSON.parse(localStorage.getItem(getLegacyStorageKey()) || '{}');
  } catch {
    return {};
  }
};

export const hydrateQuizResults = (results = {}) => {
  quizResultsCache = { ...results };
};

export const loadQuizResultsFromServer = async () => {
  const results = await fetchAllQuizResults();
  hydrateQuizResults(results);
  return results;
};

const getImportFlagKey = (email) => `${IMPORT_FLAG_PREFIX}-${email?.toLowerCase?.()?.trim() || 'guest'}`;

export const importLegacyQuizResultsOnce = async (user) => {
  const email = user?.email;
  if (!email || localStorage.getItem(getImportFlagKey(email))) return;

  const legacyStore = readLegacyQuizStore();
  const legacyEntries = Object.entries(legacyStore);
  if (legacyEntries.length === 0) {
    localStorage.setItem(getImportFlagKey(email), '1');
    return;
  }

  if (Object.keys(quizResultsCache).length > 0) {
    localStorage.setItem(getImportFlagKey(email), '1');
    return;
  }

  for (const [quizId, result] of legacyEntries) {
    try {
      const saved = await saveQuizAttempt(quizId, result);
      if (saved) {
        quizResultsCache[quizId] = saved;
      }
    } catch {

    }
  }

  localStorage.setItem(getImportFlagKey(email), '1');
};

export const saveQuizResult = async (userId, quizId, result) => {
  try {
    const saved = await saveQuizAttempt(quizId, {
      quizId,
      percentage: result.percentage,
      correct: result.correct,
      incorrect: result.incorrect,
      total: result.total,
    });
    quizResultsCache[quizId] = saved;
    return saved;
  } catch (error) {
    console.error('Failed to save quiz result:', error);
    return null;
  }
};

export const getQuizResult = (userId, quizId) => quizResultsCache[quizId] || null;

export const getAllQuizResults = (userId) => ({ ...quizResultsCache });

export const clearLocalQuizCache = () => {
  quizResultsCache = {};
  localStorage.removeItem(getLegacyStorageKey());
};

export { STORAGE_PREFIX as QUIZ_STORAGE_PREFIX };
