import { knowledgeArticles } from '../data/knowledgeCenterData';
import { getQuizById } from '../data/quizzes';

export const RESOURCE_TYPES = {
  ARTICLE: 'ARTICLE',
  VIDEO: 'VIDEO',
  SIMULATION: 'SIMULATION',
  QUIZ: 'QUIZ',
  UNKNOWN: 'UNKNOWN',
};

const SIMULATION_RESOURCES = {
  'sim-1': {
    route: '/dashboard/simulations/phishing/beginner',
    title: 'Spear Phishing Attack',
    isLocked: () => false,
  },
  'sim-4': {
    route: '/dashboard/simulations/ransomware/advanced',
    title: 'Ransomware Attack Response',
    isLocked: (user) => {
      const skillLevel = (user?.skillLevel || 'BEGINNER').toUpperCase();
      const completedBeginner = user?.simulationsCompleted?.beginner || false;
      return !(skillLevel === 'ADVANCED' || completedBeginner);
    },
    unlockReason: 'Complete the beginner phishing simulation first',
  },
};

const COMING_SOON_SIMULATIONS = new Set(['sim-2', 'sim-3']);

export const getKnowledgeResourceById = (resourceId) =>
  knowledgeArticles.find((article) => article.id === resourceId) || null;

export const getResourcePagePath = (resourceId) => `/dashboard/resources/${resourceId}`;

export const resolveModuleResource = (module, user = null) => {
  const { resourceId, type, title } = module;

  if (type === 'quiz' || resourceId?.startsWith('quiz-')) {
    const quiz = getQuizById(resourceId);
    if (!quiz) {
      return {
        type: RESOURCE_TYPES.QUIZ,
        status: 'unknown',
        resourceId,
        title,
      };
    }
    return {
      type: RESOURCE_TYPES.QUIZ,
      status: 'available',
      resourceId,
      title: quiz.title,
      route: `/dashboard/quizzes/${quiz.id}`,
      quiz,
    };
  }

  if (type === 'simulation' || resourceId?.startsWith('sim-')) {
    if (COMING_SOON_SIMULATIONS.has(resourceId)) {
      return {
        type: RESOURCE_TYPES.SIMULATION,
        status: 'coming_soon',
        resourceId,
        title,
        reason: 'This simulation is coming soon.',
      };
    }

    const simulation = SIMULATION_RESOURCES[resourceId];
    if (!simulation) {
      return {
        type: RESOURCE_TYPES.UNKNOWN,
        status: 'unknown',
        resourceId,
        title,
      };
    }

    const simLocked = simulation.isLocked?.(user) ?? false;
    return {
      type: RESOURCE_TYPES.SIMULATION,
      status: simLocked ? 'locked' : 'available',
      resourceId,
      title: simulation.title || title,
      route: simulation.route,
      unlockReason: simLocked ? simulation.unlockReason : null,
    };
  }

  const resource = getKnowledgeResourceById(resourceId);
  if (!resource) {
    return {
      type: RESOURCE_TYPES.UNKNOWN,
      status: 'unknown',
      resourceId,
      title,
    };
  }

  return {
    type: resource.type === 'video' ? RESOURCE_TYPES.VIDEO : RESOURCE_TYPES.ARTICLE,
    status: 'available',
    resourceId,
    title: resource.title,
    route: getResourcePagePath(resourceId),
    resource,
  };
};

export const getModuleActionLabel = (resolved) => {
  switch (resolved.type) {
    case RESOURCE_TYPES.SIMULATION:
      if (resolved.status === 'coming_soon') return 'Coming Soon';
      if (resolved.status === 'locked') return 'Locked';
      return 'Start Simulation';
    case RESOURCE_TYPES.VIDEO:
      return 'Watch Video';
    case RESOURCE_TYPES.ARTICLE:
      return 'Read Article';
    case RESOURCE_TYPES.QUIZ:
      if (resolved.status === 'coming_soon') return 'Coming Soon';
      if (resolved.status === 'unknown') return 'Unavailable';
      return 'Take Quiz';
    default:
      return 'Unavailable';
  }
};
