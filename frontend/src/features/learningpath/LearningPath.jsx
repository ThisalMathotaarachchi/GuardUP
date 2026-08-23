import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getLearningPath } from '../../data/learningPaths';
import {
  resolveModuleResource,
  RESOURCE_TYPES,
  getModuleActionLabel,
  getResourcePagePath,
} from '../../utils/resourceResolver';
import {
  getEffectiveCompletedIds,
  getModuleProgressStates,
  getPathProgressSummary,
  getQuizActionLabel,
} from '../../utils/learningPathProgress';
import { getAllCertificationSummaries, getCertificationProgressPercent } from '../../utils/certificationProgress';
import { STATUS_CONFIG, LEVEL_CLASS, certificationHasSimulation } from '../certifications/certificationUi';
import {
  BookOpen,
  Clock,
  Shield,
  ChevronRight,
  Check,
  Lock,
  Play,
  Video,
  HelpCircle,
  Crosshair,
  Award,
  Gamepad2,
  Layers,
} from 'lucide-react';

const TYPE_ICONS = {
  article: BookOpen,
  video: Video,
  simulation: Crosshair,
  quiz: HelpCircle,
};

const LearningPath = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const skillLevel = user?.skillLevel || 'BEGINNER';
  const path = getLearningPath(skillLevel);
  const userId = user?.id;

  const certSummaries = useMemo(
    () => getAllCertificationSummaries(userId, user),
    [userId, user, location.key]
  );

  const resolveModule = useCallback(
    (module) => resolveModuleResource(module, user),
    [user]
  );

  const completedIds = useMemo(
    () => getEffectiveCompletedIds(userId, path.modules, resolveModule),
    [userId, path.modules, resolveModule, location.key]
  );

  const moduleStates = useMemo(
    () => getModuleProgressStates(path.modules, completedIds, resolveModule),
    [path.modules, completedIds, resolveModule]
  );

  const progress = useMemo(
    () => getPathProgressSummary(path.modules, completedIds, resolveModule),
    [path.modules, completedIds, resolveModule]
  );

  const nextCert = certSummaries.find(
    (s) => s.status === 'in_progress' || s.status === 'available'
  ) ?? certSummaries[0];

  const handleModuleClick = (entry) => {
    const { resolved, progressStatus } = entry;

    if (progressStatus === 'locked' || progressStatus === 'unavailable') return;

    if (resolved.type === RESOURCE_TYPES.SIMULATION) {
      if (resolved.status === 'available' && resolved.route) {
        navigate(resolved.route);
      }
      return;
    }

    if (resolved.type === RESOURCE_TYPES.QUIZ) {
      if (resolved.status === 'available' && resolved.route) {
        navigate(resolved.route);
      }
      return;
    }

    if (
      (resolved.type === RESOURCE_TYPES.ARTICLE || resolved.type === RESOURCE_TYPES.VIDEO) &&
      resolved.resourceId
    ) {
      navigate(getResourcePagePath(resolved.resourceId), { state: { from: 'learning-path' } });
    }
  };

  const getStatusBadge = (progressStatus, resolved) => {
    if (progressStatus === 'completed') {
      return { label: 'Completed', className: 'badge-success', icon: Check };
    }
    if (progressStatus === 'current') {
      return { label: 'Current', className: 'badge-accent', icon: Play };
    }
    if (progressStatus === 'locked') {
      const label = resolved.status === 'locked' && resolved.unlockReason
        ? resolved.unlockReason
        : 'Locked';
      return { label, className: 'badge-neutral', icon: Lock };
    }
    if (progressStatus === 'unavailable') {
      return { label: 'Coming Soon', className: 'badge-neutral opacity-70', icon: Lock };
    }
    return { label: 'Available', className: 'badge-neutral', icon: ChevronRight };
  };

  const getActionLabel = (module, resolved, progressStatus) => {
    if (resolved.type === RESOURCE_TYPES.QUIZ && resolved.resourceId) {
      return getQuizActionLabel(userId, resolved.resourceId);
    }
    if (resolved.type === RESOURCE_TYPES.SIMULATION && progressStatus === 'completed') {
      return 'Retry Simulation';
    }
    return getModuleActionLabel(resolved);
  };

  const getCertNodeClass = (status) => {
    if (status === 'completed') return 'lp-roadmap__node--completed';
    if (status === 'in_progress' || status === 'available') return 'lp-roadmap__node--current';
    return 'lp-roadmap__node--locked';
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__inner max-w-5xl">
        <div className="dashboard-page__header">
          <div className="flex items-center gap-3 mb-1">
            <Shield className="text-accent" size={28} />
            <h1 className="dashboard-page__title">Your Security Journey</h1>
          </div>
          <p className="dashboard-page__subtitle">{path.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <div className="surface-elevated p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-caption mb-1">Current Level</p>
            <p className="text-2xl font-extrabold text-heading tracking-wide">{skillLevel.replace('_', ' ')}</p>
          </div>
          {nextCert && (
            <>
              <div className="surface-elevated p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-caption mb-1">Current Certification</p>
                <p className="text-sm font-bold text-heading leading-snug">{certSummaries.find((s) => s.status === 'in_progress')?.certification.title || nextCert.certification.title}</p>
              </div>
              <div className="surface-elevated p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-caption mb-1">Next Milestone</p>
                <p className="text-sm font-bold text-heading">{nextCert.certification.title}</p>
                <Link
                  to={`/dashboard/certifications/${nextCert.certification.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent mt-2"
                >
                  Continue<ChevronRight size={14} />
                </Link>
              </div>
            </>
          )}
          <div className="surface-elevated p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-caption mb-1">Overall Progress</p>
            <p className="text-2xl font-extrabold text-heading">{progress.percent}%</p>
            <div className="w-full h-1.5 progress-track mt-2">
              <div className="progress-fill" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
        </div>

        {nextCert && (
          <div className="surface-elevated px-4 py-3 mb-6 flex flex-wrap items-center gap-3">
            <Crosshair size={16} className="text-accent" />
            <span className="text-body text-sm">What&apos;s next:</span>
            <span className="font-semibold text-heading text-sm">{nextCert.certification.title}</span>
            <Link
              to={`/dashboard/certifications/${nextCert.certification.id}`}
              className="ml-auto text-sm font-semibold text-accent flex items-center gap-1"
            >
              Continue<ChevronRight size={14} />
            </Link>
          </div>
        )}

        <section className="lp-roadmap">
          <h2 className="text-lg font-bold text-heading mb-1">Certification Roadmap</h2>
          <p className="text-sm text-body mb-6">
            Progress through GuardUP certifications — each milestone builds real defensive capability.
          </p>

          <div className="lp-roadmap__track">
            <div className="lp-roadmap__milestone">
              <div className="lp-roadmap__rail">
                <div className="lp-roadmap__node lp-roadmap__node--completed">
                  <Shield size={16} />
                </div>
                <div className="lp-roadmap__connector lp-roadmap__connector--done" />
              </div>
              <div className="lp-roadmap__card">
                <p className="text-xs font-bold uppercase tracking-wide text-caption mb-1">Foundation</p>
                <h3 className="font-semibold text-heading">Security Awareness Baseline</h3>
                <p className="text-sm text-body mt-1">Your assessed skill level: {skillLevel.replace('_', ' ')}</p>
              </div>
            </div>

            {certSummaries.map((summary, index) => {
              const { certification, status, completedCount, totalActivities } = summary;
              const progressPercent = getCertificationProgressPercent(userId, certification.id, user);
              const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;
              const hasSimulation = certificationHasSimulation(certification);
              const isLast = index === certSummaries.length - 1;
              const isInteractive = status !== 'locked';

              return (
                <div key={certification.id} className="lp-roadmap__milestone">
                  <div className="lp-roadmap__rail">
                    <div className={`lp-roadmap__node ${getCertNodeClass(status)}`}>
                      <Award size={16} />
                    </div>
                    {!isLast && (
                      <div className={`lp-roadmap__connector ${status === 'completed' ? 'lp-roadmap__connector--done' : ''}`} />
                    )}
                  </div>
                  <Link
                    to={`/dashboard/certifications/${certification.id}`}
                    className={`lp-roadmap__card block ${isInteractive ? 'lp-roadmap__card--interactive' : ''} ${status === 'in_progress' ? 'lp-roadmap__card--current' : ''}`}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={LEVEL_CLASS[certification.level] ?? 'cert-level'}>{certification.level}</span>
                      <span className={statusConfig.className}>{statusConfig.label}</span>
                    </div>
                    <h3 className="font-bold text-heading">{certification.title}</h3>
                    <p className="text-sm text-body mt-1 line-clamp-2">{certification.shortDescription}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-caption">
                      <span className="inline-flex items-center gap-1"><Clock size={12} />{certification.estimatedDuration}</span>
                      <span className="inline-flex items-center gap-1"><Layers size={12} />{totalActivities} activities</span>
                      {hasSimulation && (
                        <span className="inline-flex items-center gap-1 text-accent font-semibold">
                          <Gamepad2 size={12} />Simulation
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-caption">Progress</span>
                        <span className="font-semibold text-heading">{progressPercent}%</span>
                      </div>
                      <div className="h-1.5 progress-track">
                        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                      </div>
                      <p className="text-xs text-caption mt-1">{completedCount} of {totalActivities} complete</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-heading mb-1">Skill Path Modules</h2>
          <p className="text-sm text-body mb-4">
            Reference modules aligned to your assessed level — {progress.completedCount} of {progress.totalCount} complete
          </p>

          <div className="mb-6">
            <div className="flex justify-between text-xs text-caption mb-1">
              <span>Path progress</span>
              <span>{progress.percent}%</span>
            </div>
            <div className="w-full h-2 progress-track">
              <div className="progress-fill transition-all duration-300" style={{ width: `${progress.percent}%` }} />
            </div>
            <p className="text-xs text-caption mt-2">
              Quiz modules require 60% or higher. Articles and videos are reference material.
            </p>
          </div>

          <div className="space-y-3">
            {moduleStates.map((entry, index) => {
              const { module, resolved, progressStatus } = entry;
              const statusBadge = getStatusBadge(progressStatus, resolved);
              const StatusIcon = statusBadge.icon;
              const TypeIcon = TYPE_ICONS[module.type] || BookOpen;
              const isReferenceModule =
                resolved.type === RESOURCE_TYPES.ARTICLE || resolved.type === RESOURCE_TYPES.VIDEO;
              const isInteractive =
                progressStatus === 'current'
                || progressStatus === 'completed'
                || (isReferenceModule && progressStatus === 'available');
              const actionLabel = getActionLabel(module, resolved, progressStatus);

              return (
                <div
                  key={module.id}
                  role={isInteractive ? 'button' : undefined}
                  tabIndex={isInteractive ? 0 : undefined}
                  onClick={() => isInteractive && handleModuleClick(entry)}
                  onKeyDown={(e) => {
                    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleModuleClick(entry);
                    }
                  }}
                  className={`lp-module-card ${isInteractive ? 'lp-module-card--interactive' : 'opacity-70 cursor-default'} ${progressStatus === 'current' ? 'lp-module-card--current' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-caption font-mono">#{index + 1}</span>
                        <span className={`text-xs px-3 py-1 rounded-full ${module.difficulty === 'Easy' ? 'badge-easy' : module.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                          {module.difficulty}
                        </span>
                        <span className="text-xs text-caption uppercase flex items-center gap-1">
                          <TypeIcon size={12} />
                          {module.type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusBadge.className}`}>
                          <StatusIcon size={12} />
                          {statusBadge.label}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-heading">{module.title}</h3>
                      <p className="text-body text-sm mt-1">{module.description}</p>
                      {resolved.reason && progressStatus === 'unavailable' && (
                        <p className="text-caption text-xs mt-2">{resolved.reason}</p>
                      )}
                      {isInteractive && (
                        <p className="text-accent text-xs mt-2 font-medium">{actionLabel}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                      <div className="flex items-center gap-1 text-sm text-body">
                        <Clock size={16} />
                        <span>{module.timeEstimate}</span>
                      </div>
                      {isInteractive ? (
                        <ChevronRight size={20} className="text-caption" />
                      ) : (
                        <Lock size={18} className="text-caption" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningPath;
