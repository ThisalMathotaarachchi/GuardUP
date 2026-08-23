import { Link } from 'react-router-dom';
import {
  Award,
  Clock,
  Layers,
  Gamepad2,
  ChevronRight,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import {
  STATUS_CONFIG,
  LEVEL_CLASS,
  getCatalogAction,
  getPrerequisiteLabels,
  certificationHasSimulation,
} from './certificationUi';

const CertificationCard = ({ summary, progressPercent }) => {
  const { certification, status, completedCount, totalActivities, lockReason } = summary;
  const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;
  const action = getCatalogAction(status);
  const prerequisites = getPrerequisiteLabels(certification.prerequisites);
  const hasSimulation = certificationHasSimulation(certification);

  const detailPath = `/dashboard/certifications/${certification.id}`;
  const startPath = `/dashboard/certifications/${certification.id}/activity`;
  const primaryPath = status === 'completed' ? detailPath : startPath;

  return (
    <article className="cert-card">
      <div className="cert-card__accent" aria-hidden="true" />

      <div className="cert-card__header">
        <div className="flex flex-wrap items-center gap-2">
          <span className={LEVEL_CLASS[certification.level] ?? 'cert-level'}>
            {certification.level}
          </span>
          <span className={statusConfig.className}>
            {status === 'locked' && <Lock size={12} className="inline -mt-px mr-1" />}
            {status === 'completed' && <CheckCircle2 size={12} className="inline -mt-px mr-1" />}
            {statusConfig.label}
          </span>
        </div>
        <Award className="cert-card__icon" size={22} aria-hidden="true" />
      </div>

      <div className="cert-card__badge-preview" aria-hidden="true">
        <Award size={28} className="text-accent opacity-80" />
      </div>

      <h2 className="cert-card__title">{certification.title}</h2>
      <p className="cert-card__description">{certification.shortDescription}</p>

      <div className="cert-card__meta">
        <span className="cert-card__meta-item">
          <Clock size={14} />
          {certification.estimatedDuration}
        </span>
        <span className="cert-card__meta-item">
          <Layers size={14} />
          {certification.activityCount} activities
        </span>
        {hasSimulation && (
          <span className="cert-card__meta-item cert-card__meta-item--sim">
            <Gamepad2 size={14} />
            Simulation included
          </span>
        )}
      </div>

      <div className="cert-card__skills">
        <p className="cert-card__skills-label">Skills covered</p>
        <ul className="cert-card__skills-list">
          {certification.learningObjectives.slice(0, 3).map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </div>

      {(lockReason || (prerequisites.length > 0 && status === 'locked')) && (
        <p className="cert-card__prereq">
          {lockReason || `Requires: ${prerequisites.join(', ')}`}
        </p>
      )}

      <div className="cert-card__progress">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-caption">Progress</span>
          <span className="font-semibold text-heading">{progressPercent}%</span>
        </div>
        <div className="cert-card__progress-track">
          <div className="cert-card__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs text-caption mt-1.5">
          {completedCount} of {totalActivities} activities complete
        </p>
      </div>

      <div className="cert-card__actions">
        {action.disabled ? (
          <button type="button" className="cert-btn cert-btn--disabled" disabled>
            <Lock size={16} />
            {action.label}
          </button>
        ) : (
          <>
            <Link
              to={primaryPath}
              className="cert-btn cert-btn--primary"
            >
              {action.label}
              <ChevronRight size={16} />
            </Link>
            <Link to={detailPath} className="cert-btn cert-btn--ghost">
              View details
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default CertificationCard;
