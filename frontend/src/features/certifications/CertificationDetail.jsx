import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getCertificationSummary,
  getCertificationProgressPercent,
  getActivityProgressStates,
  getCertificationSimulation,
  getNextActivity,
} from '../../utils/certificationProgress';
import {
  LEVEL_CLASS,
  STATUS_CONFIG,
  getDetailAction,
  getPrerequisiteLabels,
  certificationHasSimulation,
  ACTIVITY_TYPE_CONFIG,
} from './certificationUi';
import CertificationJourney from './CertificationJourney';
import {
  ArrowLeft,
  Award,
  Clock,
  Gamepad2,
  Target,
  ChevronRight,
  Lock,
} from 'lucide-react';

const CertificationDetail = () => {
  const { certificationId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id;

  const summary = getCertificationSummary(userId, certificationId, user);

  if (!summary) {
    return (
      <div className="cert-page">
        <div className="cert-page__inner">
          <Link to="/dashboard/certifications" className="cert-back-link">
            <ArrowLeft size={16} />
            Back to Certifications
          </Link>
          <h1 className="cert-page__title">Certification not found</h1>
        </div>
      </div>
    );
  }

  const { certification, status, completedCount, totalActivities, lockReason } = summary;
  const progressPercent = getCertificationProgressPercent(userId, certificationId, user);
  const activityStates = getActivityProgressStates(userId, certificationId, user);
  const simulation = getCertificationSimulation(certificationId);
  const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;
  const action = getDetailAction(status);
  const prerequisites = getPrerequisiteLabels(certification.prerequisites);
  const hasSimulation = certificationHasSimulation(certification);
  const nextActivity = getNextActivity(userId, certificationId, user);

  const experienceSteps = [
    'Guided introduction to the threat landscape',
    'Interactive articles and videos from the Knowledge Center',
    'Knowledge checks to validate understanding',
    hasSimulation ? 'Hands-on simulation in a safe environment' : null,
    'Structured debrief and final assessment',
    'GuardUP certificate upon completion',
  ].filter(Boolean);

  const handleStart = () => {
    if (status === 'locked') return;
    const next = getNextActivity(userId, certificationId, user) ?? certification.activities[0];
    if (next) {
      navigate(`/dashboard/certifications/${certificationId}/activity`, {
        state: { activityId: next.id },
      });
    }
  };

  const handleActivitySelect = (activityId) => {
    navigate(`/dashboard/certifications/${certificationId}/activity`, {
      state: { activityId },
    });
  };

  return (
    <div className="cert-page">
      <div className="cert-page__inner cert-page__inner--wide">
        <Link to="/dashboard/certifications" className="cert-back-link">
          <ArrowLeft size={16} />
          Back to Certifications
        </Link>

        <header className="cert-detail-hero">
          <div className="cert-detail-hero__content">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={LEVEL_CLASS[certification.level] ?? 'cert-level'}>
                {certification.level}
              </span>
              <span className={statusConfig.className}>{statusConfig.label}</span>
            </div>
            <h1 className="cert-detail-hero__title">{certification.title}</h1>
            <p className="cert-detail-hero__description">{certification.description}</p>

            <div className="cert-detail-hero__stats">
              <span><Clock size={15} /> {certification.estimatedDuration}</span>
              <span><Target size={15} /> {certification.activityCount} activities</span>
              <span>{completedCount}/{totalActivities} complete · {progressPercent}%</span>
            </div>

            {prerequisites.length > 0 && (
              <p className="cert-detail-hero__prereq">
                Prerequisites: {prerequisites.join(', ')}
              </p>
            )}

            {action && (
              <button
                type="button"
                onClick={handleStart}
                className={action.variant === 'secondary' ? 'cert-btn cert-btn--secondary cert-detail-hero__cta' : 'cert-btn cert-btn--primary cert-detail-hero__cta'}
              >
                {action.label}
                <ChevronRight size={18} />
              </button>
            )}

            {status === 'locked' && (
              <p className="cert-detail-hero__locked">
                <Lock size={16} />
                {lockReason || 'Complete prerequisite certifications to unlock this path.'}
              </p>
            )}
          </div>

          <div className="cert-detail-hero__aside">
            {simulation && (
              <div className="cert-detail-highlight">
                <Gamepad2 size={22} className="text-accent" />
                <div>
                  <p className="cert-detail-highlight__label">Simulation highlight</p>
                  <p className="cert-detail-highlight__title">{simulation.title}</p>
                  <p className="cert-detail-highlight__text">{simulation.description}</p>
                </div>
              </div>
            )}

            <div className="cert-detail-highlight">
              <Award size={22} className="text-accent" />
              <div>
                <p className="cert-detail-highlight__label">Certificate</p>
                <p className="cert-detail-highlight__title">{certification.certificate.title}</p>
                <p className="cert-detail-highlight__text">Issued by {certification.certificate.issuer}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="cert-detail-grid">
          <section className="cert-detail-panel">
            <h2 className="cert-detail-panel__title">Skills you will gain</h2>
            <ul className="cert-detail-list">
              {certification.learningObjectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </section>

          <section className="cert-detail-panel">
            <h2 className="cert-detail-panel__title">What you will experience</h2>
            <ul className="cert-detail-list">
              {experienceSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>
        </div>

        {nextActivity && status !== 'completed' && status !== 'locked' && (
          <div className="cert-detail-next">
            <p className="text-sm text-body">Up next</p>
            <p className="font-semibold text-heading">{nextActivity.title}</p>
            <p className="text-xs text-caption mt-0.5">
              {ACTIVITY_TYPE_CONFIG[nextActivity.type]?.label} · {nextActivity.estimatedDuration}
            </p>
          </div>
        )}

        <section className="cert-detail-roadmap">
          <h2 className="cert-detail-roadmap__title">Your learning journey</h2>
          <p className="cert-detail-roadmap__subtitle">
            Progress through each stage — from introduction to certification.
          </p>
          <CertificationJourney activityStates={activityStates} onActivitySelect={handleActivitySelect} />
        </section>
      </div>
    </div>
  );
};

export default CertificationDetail;
