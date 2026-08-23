import { buildAccountStorageKey } from './accountStorageKey';
import { CERT_PROGRESS_STORAGE_PREFIX } from './certificationProgressStore';
import { QUIZ_STORAGE_PREFIX } from './quizStorage';
import { hydrateCertificationProgress } from './certificationProgressStore';
import { hydrateQuizResults } from './quizStorage';

const IMPORT_PREFIXES = ['guardup-cert-imported', 'guardup-quiz-imported'];

const getCacheKeys = () => {
  const keys = [
    buildAccountStorageKey(CERT_PROGRESS_STORAGE_PREFIX),
    buildAccountStorageKey(QUIZ_STORAGE_PREFIX),
  ];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key) continue;
    if (IMPORT_PREFIXES.some((prefix) => key.startsWith(`${prefix}-`))) {
      keys.push(key);
    }
  }

  return [...new Set(keys)];
};

export const clearAppCache = () => {
  getCacheKeys().forEach((key) => localStorage.removeItem(key));
  hydrateCertificationProgress([]);
  hydrateQuizResults({});
};
