import { buildAccountStorageKey } from './accountStorageKey';
import {
  fetchAllCertificationProgress,
  completeCertificationActivity,
} from '../services/certificationProgressApi';

const STORAGE_PREFIX = 'guardup-cert-progress';
const IMPORT_FLAG_PREFIX = 'guardup-cert-imported';


export const progressCache = {};

const emptyProgress = (certificationId) => ({
  certificationId,
  completedActivityIds: [],
  startedAt: null,
  completedAt: null,
});

const getLegacyStorageKey = () => buildAccountStorageKey(STORAGE_PREFIX);

const readLegacyProgressStore = () => {
  try {
    const stored = localStorage.getItem(getLegacyStorageKey());
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const hydrateCertificationProgress = (progressList = []) => {
  Object.keys(progressCache).forEach((key) => {
    delete progressCache[key];
  });

  progressList.forEach((record) => {
    if (record?.certificationId) {
      progressCache[record.certificationId] = {
        certificationId: record.certificationId,
        completedActivityIds: record.completedActivityIds ?? [],
        startedAt: record.startedAt ?? null,
        completedAt: record.completedAt ?? null,
      };
    }
  });
};

export const loadCertificationProgressFromServer = async () => {
  const progressList = await fetchAllCertificationProgress();
  hydrateCertificationProgress(progressList);
  return progressList;
};

const getImportFlagKey = (email) => `${IMPORT_FLAG_PREFIX}-${email?.toLowerCase?.()?.trim() || 'guest'}`;


export const importLegacyCertificationProgressOnce = async (user) => {
  const email = user?.email;
  if (!email || localStorage.getItem(getImportFlagKey(email))) return;

  const legacyStore = readLegacyProgressStore();
  const legacyEntries = Object.entries(legacyStore);
  if (legacyEntries.length === 0) {
    localStorage.setItem(getImportFlagKey(email), '1');
    return;
  }

  const serverHasProgress = Object.keys(progressCache).some(
    (certificationId) => (progressCache[certificationId]?.completedActivityIds?.length || 0) > 0
  );
  if (serverHasProgress) {
    localStorage.setItem(getImportFlagKey(email), '1');
    return;
  }

  for (const [certificationId, record] of legacyEntries) {
    const activityIds = record?.completedActivityIds || [];
    for (const activityId of activityIds) {
      try {
        const result = await completeCertificationActivity(certificationId, activityId);
        if (result?.progress) {
          progressCache[certificationId] = result.progress;
        }
      } catch {

      }
    }
  }

  localStorage.setItem(getImportFlagKey(email), '1');
};

export const clearLocalCertificationCache = () => {
  Object.keys(progressCache).forEach((key) => {
    delete progressCache[key];
  });
  localStorage.removeItem(getLegacyStorageKey());
};

export { STORAGE_PREFIX as CERT_PROGRESS_STORAGE_PREFIX };
