import { RESOURCE_TYPES } from './resourceResolver';
import { getQuizResult } from './quizStorage';

export const QUIZ_PASS_THRESHOLD = 60;

export const isQuizPassed = (userId, quizId) => {
  const result = getQuizResult(userId, quizId);
  return result != null && result.percentage >= QUIZ_PASS_THRESHOLD;
};

export const getQuizActionLabel = (userId, quizId) => {
  const result = getQuizResult(userId, quizId);
  if (!result) return 'Take Quiz';
  if (result.percentage >= QUIZ_PASS_THRESHOLD) return 'Retake Quiz';
  return 'Retry Quiz';
};

const isReferenceModule = (resolved) =>
  resolved.type === RESOURCE_TYPES.ARTICLE || resolved.type === RESOURCE_TYPES.VIDEO;

const isProgressionModule = (resolved) =>
  resolved.status === 'available' || resolved.status === 'locked';

const hasPriorIncompleteTrackedModules = (modules, index, completedIds, resolveFn) =>
  modules.slice(0, index).some((priorModule) => {
    const priorResolved = resolveFn(priorModule);
    if (isReferenceModule(priorResolved)) return false;
    if (!isProgressionModule(priorResolved)) return false;
    return !completedIds.includes(priorModule.id);
  });

export const getEffectiveCompletedIds = (userId, modules, resolveFn) => {
  const effective = new Set();

  modules.forEach((module) => {
    const resolved = resolveFn(module);
    if (resolved.type === RESOURCE_TYPES.QUIZ && resolved.resourceId && isQuizPassed(userId, resolved.resourceId)) {
      effective.add(module.id);
    }
  });

  return Array.from(effective);
};

export const getModuleProgressStates = (modules, completedIds, resolveFn) => {
  let currentAssigned = false;

  return modules.map((module, index) => {
    const resolved = resolveFn(module);

    if (resolved.status === 'coming_soon' || resolved.status === 'unknown') {
      return { module, resolved, progressStatus: 'unavailable' };
    }

    if (isReferenceModule(resolved)) {
      const priorBlockingIncomplete = hasPriorIncompleteTrackedModules(
        modules,
        index,
        completedIds,
        resolveFn
      );
      if (priorBlockingIncomplete) {
        return { module, resolved, progressStatus: 'locked' };
      }
      return { module, resolved, progressStatus: 'available' };
    }

    if (completedIds.includes(module.id)) {
      return { module, resolved, progressStatus: 'completed' };
    }

    if (!isProgressionModule(resolved)) {
      return { module, resolved, progressStatus: 'unavailable' };
    }

    const priorIncomplete = hasPriorIncompleteTrackedModules(
      modules,
      index,
      completedIds,
      resolveFn
    );

    if (!currentAssigned && !priorIncomplete) {
      currentAssigned = true;
      if (resolved.status === 'locked') {
        return { module, resolved, progressStatus: 'locked' };
      }
      return { module, resolved, progressStatus: 'current' };
    }

    return { module, resolved, progressStatus: 'locked' };
  });
};

export const getPathProgressSummary = (modules, completedIds, resolveFn) => {
  const progressionModules = modules.filter((module) => {
    const resolved = resolveFn(module);
    if (isReferenceModule(resolved)) return false;
    return isProgressionModule(resolved);
  });

  const completedCount = progressionModules.filter((module) =>
    completedIds.includes(module.id)
  ).length;

  return {
    completedCount,
    totalCount: progressionModules.length,
    percent: progressionModules.length
      ? Math.round((completedCount / progressionModules.length) * 100)
      : 0,
  };
};
