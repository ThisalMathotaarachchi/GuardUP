import {
  CERTIFICATION_STATUS,
  ACTIVITY_TYPES,
  getCertificationById,
  getCertificationActivities,
  getAllCertifications,
} from '../data/certifications';
import { getQuizResult } from './quizStorage';
import { completeCertificationActivity } from '../services/certificationProgressApi';
import {
  progressCache,
  hydrateCertificationProgress,
  loadCertificationProgressFromServer,
  importLegacyCertificationProgressOnce,
} from './certificationProgressStore';

export {
  hydrateCertificationProgress,
  loadCertificationProgressFromServer,
  importLegacyCertificationProgressOnce,
};


export const CERTIFICATION_IDS = {
  BEGINNER: 'cert-phishing-defense',
  INTERMEDIATE: 'cert-ransomware-response',
  ADVANCED: 'cert-advanced-threat',
};

const normalizeSkillLevel = (user) => {
  const level = user?.skillLevel || 'BEGINNER';
  return String(level).toUpperCase().replace(/\s+/g, '_');
};

export const QUIZ_PASS_THRESHOLD = 60;


const SIMULATION_COMPLETION_CHECKS = {
  'sim-1': (user) => Boolean(user?.simulationsCompleted?.beginner),
  'sim-4': (user) => Boolean(user?.simulationsCompleted?.advanced),
  'sim-the-breach': (user) => Boolean(user?.simulationsCompleted?.['sim-the-breach']),
};

const getStorageKey = () => null;

export const getCertificationProgress = (userId, certificationId) => {
  const record = progressCache[certificationId];

  if (!record) {
    return {
      certificationId,
      completedActivityIds: [],
      startedAt: null,
      completedAt: null,
    };
  }

  return {
    certificationId,
    completedActivityIds: record.completedActivityIds ?? [],
    startedAt: record.startedAt ?? null,
    completedAt: record.completedAt ?? null,
  };
};

const isActivityComingSoon = (activity) =>
  activity.metadata?.comingSoon === true;

const isQuizActivityPassed = (userId, activity) => {
  if (!activity.quizId || isActivityComingSoon(activity)) return false;
  const result = getQuizResult(userId, activity.quizId);
  const threshold = activity.metadata?.passThreshold ?? QUIZ_PASS_THRESHOLD;
  return result != null && result.percentage >= threshold;
};

const isActivityComplete = (userId, activity, completedActivityIds) => {
  if (completedActivityIds.includes(activity.id)) return true;

  if (activity.type === ACTIVITY_TYPES.FINAL_ASSESSMENT) {
    return false;
  }

  if (activity.type === ACTIVITY_TYPES.QUIZ) {
    return isQuizActivityPassed(userId, activity);
  }

  return false;
};

export const isCertificationCompleted = (userId, certificationId) => {
  const cert = getCertificationById(certificationId);
  if (!cert) return false;

  const progress = getCertificationProgress(userId, certificationId);
  if (progress.completedAt) return true;

  const activities = getCertificationActivities(certificationId);
  const completable = activities.filter((activity) => !isActivityComingSoon(activity));

  if (completable.length === 0) return false;

  return completable.every((activity) =>
    isActivityComplete(userId, activity, progress.completedActivityIds)
  );
};

export const isCertificationUnlocked = (userId, certificationId, user = null) => {
  const cert = getCertificationById(certificationId);
  if (!cert) return false;

  const skillLevel = normalizeSkillLevel(user);


  if (skillLevel === 'ADVANCED') {
    return true;
  }

  const beginnerComplete = isCertificationCompleted(userId, CERTIFICATION_IDS.BEGINNER);
  const intermediateComplete = isCertificationCompleted(userId, CERTIFICATION_IDS.INTERMEDIATE);

  switch (certificationId) {
    case CERTIFICATION_IDS.BEGINNER:
      return true;

    case CERTIFICATION_IDS.INTERMEDIATE:

      if (skillLevel === 'INTERMEDIATE') return true;
      return beginnerComplete;

    case CERTIFICATION_IDS.ADVANCED:

      return intermediateComplete;

    default:
      if (!cert.prerequisites?.length) return true;
      return cert.prerequisites.every((prerequisiteId) =>
        isCertificationCompleted(userId, prerequisiteId)
      );
  }
};


export const getCertificationLockReason = (userId, certificationId, user = null) => {
  if (isCertificationUnlocked(userId, certificationId, user)) return null;

  const skillLevel = normalizeSkillLevel(user);

  if (certificationId === CERTIFICATION_IDS.INTERMEDIATE) {
    return 'Complete the Beginner certification to unlock Intermediate.';
  }

  if (certificationId === CERTIFICATION_IDS.ADVANCED) {
    if (skillLevel === 'INTERMEDIATE') {
      return 'Complete the Intermediate certification to unlock Advanced.';
    }
    return 'Complete the Intermediate certification to unlock Advanced.';
  }

  const cert = getCertificationById(certificationId);
  if (cert?.prerequisites?.length) {
    const labels = cert.prerequisites
      .map((id) => getCertificationById(id)?.title)
      .filter(Boolean);
    if (labels.length) return `Requires: ${labels.join(', ')}`;
  }

  return 'Complete prerequisite certifications to unlock this path.';
};

export const getCertificationStatus = (userId, certificationId, user = null) => {
  const cert = getCertificationById(certificationId);
  if (!cert) return CERTIFICATION_STATUS.LOCKED;

  if (!isCertificationUnlocked(userId, certificationId, user)) {
    return CERTIFICATION_STATUS.LOCKED;
  }

  if (isCertificationCompleted(userId, certificationId)) {
    return CERTIFICATION_STATUS.COMPLETED;
  }

  const progress = getCertificationProgress(userId, certificationId);
  const hasStarted = Boolean(
    progress.startedAt
    || progress.completedActivityIds.length > 0
  );

  if (hasStarted) return CERTIFICATION_STATUS.IN_PROGRESS;

  return CERTIFICATION_STATUS.AVAILABLE;
};

export const getNextActivity = (userId, certificationId, user = null) => {
  const cert = getCertificationById(certificationId);
  if (!cert || !isCertificationUnlocked(userId, certificationId, user)) return null;

  const progress = getCertificationProgress(userId, certificationId);

  for (const activity of cert.activities) {
    if (isActivityComingSoon(activity)) continue;
    if (!isActivityComplete(userId, activity, progress.completedActivityIds)) {
      return activity;
    }
  }

  return null;
};

export const markActivityComplete = async (userId, certificationId, activityId) => {
  const cert = getCertificationById(certificationId);
  const activity = cert?.activities.find((item) => item.id === activityId);
  if (!cert || !activity || isActivityComingSoon(activity)) {
    return { progress: null, justCompleted: false };
  }

  try {
    const result = await completeCertificationActivity(certificationId, activityId);
    if (result?.progress) {
      progressCache[certificationId] = result.progress;
    }
    return {
      progress: getCertificationProgress(userId, certificationId),
      justCompleted: Boolean(result?.justCompleted),
    };
  } catch (error) {
    console.error('Failed to mark certification activity complete:', error);
    return { progress: getCertificationProgress(userId, certificationId), justCompleted: false };
  }
};

export const getCertificationSummary = (userId, certificationId, user = null) => {
  const cert = getCertificationById(certificationId);
  if (!cert) return null;

  const progress = getCertificationProgress(userId, certificationId);
  const activities = getCertificationActivities(certificationId);
  const unlocked = isCertificationUnlocked(userId, certificationId, user);
  const status = getCertificationStatus(userId, certificationId, user);
  const nextActivity = getNextActivity(userId, certificationId, user);

  const completedCount = activities.filter((activity) =>
    isActivityComplete(userId, activity, progress.completedActivityIds)
  ).length;

  return {
    certification: cert,
    status,
    unlocked,
    lockReason:
      status === CERTIFICATION_STATUS.LOCKED
        ? getCertificationLockReason(userId, certificationId, user)
        : null,
    progress,
    completedCount,
    totalActivities: activities.length,
    nextActivity,
  };
};

export const getAllCertificationSummaries = (userId, user = null) =>
  getAllCertifications().map((cert) => getCertificationSummary(userId, cert.id, user));

export const getCertificationProgressPercent = (userId, certificationId, user = null) => {
  const summary = getCertificationSummary(userId, certificationId, user);
  if (!summary || summary.totalActivities === 0) return 0;
  return Math.round((summary.completedCount / summary.totalActivities) * 100);
};

export const getActivityProgressStates = (userId, certificationId, user = null) => {
  const cert = getCertificationById(certificationId);
  if (!cert) return [];

  const progress = getCertificationProgress(userId, certificationId);
  const unlocked = isCertificationUnlocked(userId, certificationId, user);
  const nextActivity = getNextActivity(userId, certificationId, user);

  return cert.activities.map((activity) => {
    if (isActivityComingSoon(activity)) {
      return { activity, state: 'coming_soon' };
    }
    if (!unlocked) {
      return { activity, state: 'locked' };
    }
    if (isActivityComplete(userId, activity, progress.completedActivityIds)) {
      return { activity, state: 'completed' };
    }
    if (nextActivity?.id === activity.id) {
      return { activity, state: 'current' };
    }
    return { activity, state: 'locked' };
  });
};

export const getCertificationSimulation = (certificationId) => {
  const activities = getCertificationActivities(certificationId);
  return activities.find((activity) => activity.type === ACTIVITY_TYPES.SIMULATION) ?? null;
};

export const getCountableActivities = (certificationId) => {
  const activities = getCertificationActivities(certificationId);
  return activities.filter((activity) => !isActivityComingSoon(activity));
};

export const getActivityPosition = (certificationId, activityId) => {
  const countable = getCountableActivities(certificationId);
  const index = countable.findIndex((activity) => activity.id === activityId);
  return index >= 0 ? { index: index + 1, total: countable.length } : null;
};

export const isActivityAccessible = (userId, certificationId, activityId, user = null) => {
  const states = getActivityProgressStates(userId, certificationId, user);
  const entry = states.find((item) => item.activity.id === activityId);
  if (!entry) return false;
  return entry.state === 'current' || entry.state === 'completed';
};

export const isSimulationActivityComplete = (user, activity) => {
  if (!activity?.simulationId) return false;
  const checker = SIMULATION_COMPLETION_CHECKS[activity.simulationId];
  return checker ? checker(user) : false;
};


export const syncSimulationCompletion = async (userId, certificationId, user) => {
  const cert = getCertificationById(certificationId);
  if (!cert || !user) return;

  for (const activity of cert.activities) {
    if (
      activity.type === ACTIVITY_TYPES.SIMULATION
      && !isActivityComingSoon(activity)
      && isSimulationActivityComplete(user, activity)
    ) {
      await markActivityComplete(userId, certificationId, activity.id);
    }
  }
};

export const resolveWorkspaceActivity = async (userId, certificationId, requestedActivityId, user = null) => {
  if (user) {
    await syncSimulationCompletion(userId, certificationId, user);
  }

  const cert = getCertificationById(certificationId);
  if (!cert) return { kind: 'not_found' };

  if (!isCertificationUnlocked(userId, certificationId, user)) {
    return { kind: 'locked' };
  }

  const completed = isCertificationCompleted(userId, certificationId);

  if (requestedActivityId) {
    const activity = cert.activities.find((item) => item.id === requestedActivityId);
    if (!activity) return { kind: 'not_found' };
    if (isActivityComingSoon(activity)) {
      return { kind: 'coming_soon', certification: cert, activity };
    }
    if (!isActivityAccessible(userId, certificationId, activity.id, user)) {
      return { kind: 'locked_activity', certification: cert, activity };
    }
    const states = getActivityProgressStates(userId, certificationId, user);
    const state = states.find((item) => item.activity.id === activity.id)?.state;
    return {
      kind: 'activity',
      certification: cert,
      activity,
      mode: state === 'completed' ? 'review' : 'active',
    };
  }

  if (completed) {
    return { kind: 'completed', certification: cert };
  }

  const nextActivity = getNextActivity(userId, certificationId, user);
  if (!nextActivity) {
    return { kind: 'completed', certification: cert };
  }

  return {
    kind: 'activity',
    certification: cert,
    activity: nextActivity,
    mode: 'active',
  };
};

export const getNextCertification = (currentCertificationId) => {
  const all = getAllCertifications();
  const index = all.findIndex((cert) => cert.id === currentCertificationId);
  if (index < 0 || index >= all.length - 1) return null;
  return all[index + 1];
};

export const getFinalAssessmentResult = (userId, certificationId) => {
  const cert = getCertificationById(certificationId);
  if (!cert) return null;
  const finalActivity = cert.activities.find(
    (activity) => activity.type === ACTIVITY_TYPES.FINAL_ASSESSMENT && !isActivityComingSoon(activity)
  );
  if (!finalActivity?.quizId) return null;
  return getQuizResult(userId, finalActivity.quizId);
};


export const reconcileCertificationProgressWithUser = async (userId, user) => {
  if (!userId || !user) return;

  for (const cert of getAllCertifications()) {
    const record = progressCache[cert.id];
    if (!record?.completedActivityIds?.length) continue;

    for (const activityId of [...record.completedActivityIds]) {
      const activity = cert.activities.find((item) => item.id === activityId);
      if (!activity || activity.type !== ACTIVITY_TYPES.SIMULATION) continue;
      if (isSimulationActivityComplete(user, activity)) continue;

      progressCache[cert.id] = {
        ...record,
        completedActivityIds: record.completedActivityIds.filter((id) => id !== activityId),
      };
    }
  }
};

export { getCertificationById, getCertificationActivities, isActivityComplete };
