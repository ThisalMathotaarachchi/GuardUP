import {
  BookOpen,
  Video,
  ClipboardCheck,
  Gamepad2,
  MessageSquare,
  Flag,
  PlayCircle,
  Award,
  Lock,
  Clock,
  Crosshair,
} from 'lucide-react';
import { ACTIVITY_TYPES } from '../../data/certifications';
import { getCertificationById } from '../../utils/certificationProgress';

export const STATUS_CONFIG = {
  locked: {
    label: 'Locked',
    className: 'cert-status cert-status--locked',
  },
  available: {
    label: 'Available',
    className: 'cert-status cert-status--available',
  },
  in_progress: {
    label: 'In Progress',
    className: 'cert-status cert-status--progress',
  },
  completed: {
    label: 'Completed',
    className: 'cert-status cert-status--completed',
  },
};

export const ACTIVITY_TYPE_CONFIG = {
  [ACTIVITY_TYPES.INTRO]: {
    label: 'Introduction',
    shortLabel: 'Intro',
    icon: PlayCircle,
    phase: 'INTRODUCTION',
  },
  [ACTIVITY_TYPES.ARTICLE]: {
    label: 'Learn',
    shortLabel: 'Article',
    icon: BookOpen,
    phase: 'LEARN',
  },
  [ACTIVITY_TYPES.VIDEO]: {
    label: 'Video',
    shortLabel: 'Video',
    icon: Video,
    phase: 'VIDEO',
  },
  [ACTIVITY_TYPES.QUIZ]: {
    label: 'Knowledge Check',
    shortLabel: 'Quiz',
    icon: ClipboardCheck,
    phase: 'KNOWLEDGE CHECK',
  },
  [ACTIVITY_TYPES.SIMULATION]: {
    label: 'Simulation',
    shortLabel: 'Simulation',
    icon: Gamepad2,
    phase: 'SIMULATION',
  },
  [ACTIVITY_TYPES.DEBRIEF]: {
    label: 'Debrief',
    shortLabel: 'Debrief',
    icon: MessageSquare,
    phase: 'DEBRIEF',
  },
  [ACTIVITY_TYPES.FINAL_ASSESSMENT]: {
    label: 'Final Assessment',
    shortLabel: 'Assessment',
    icon: Flag,
    phase: 'FINAL ASSESSMENT',
  },
};

export const LEVEL_CLASS = {
  Beginner: 'cert-level cert-level--beginner',
  Intermediate: 'cert-level cert-level--intermediate',
  Advanced: 'cert-level cert-level--advanced',
};

export const getCatalogAction = (status) => {
  switch (status) {
    case 'locked':
      return { label: 'Locked', disabled: true };
    case 'in_progress':
      return { label: 'Continue Certification', disabled: false };
    case 'completed':
      return { label: 'View Certification', disabled: false };
    default:
      return { label: 'Start Certification', disabled: false };
  }
};

export const getDetailAction = (status) => {
  switch (status) {
    case 'locked':
      return null;
    case 'in_progress':
      return { label: 'Continue Certification', variant: 'primary' };
    case 'completed':
      return { label: 'Review Certification', variant: 'secondary' };
    default:
      return { label: 'Start Certification', variant: 'primary' };
  }
};

export const getPrerequisiteLabels = (prerequisiteIds) =>
  prerequisiteIds
    .map((id) => getCertificationById(id)?.title)
    .filter(Boolean);

export const certificationHasSimulation = (certification) =>
  certification.activities.some((activity) => activity.type === ACTIVITY_TYPES.SIMULATION);

export const getActivityIcon = (type) =>
  ACTIVITY_TYPE_CONFIG[type]?.icon ?? BookOpen;

export const ACTIVITY_STATE_CONFIG = {
  locked: { label: 'Locked', className: 'cert-journey-node--locked', icon: Lock },
  current: { label: 'Current', className: 'cert-journey-node--current', icon: Crosshair },
  completed: { label: 'Completed', className: 'cert-journey-node--completed', icon: Award },
  coming_soon: { label: 'Coming Soon', className: 'cert-journey-node--soon', icon: Clock },
};
