import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Download, ChevronRight, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import Badge, { normalizeBadge } from '../../../components/common/Badge';
import {
  getCertificationProgress,
  getCertificationSimulation,
  getFinalAssessmentResult,
  getNextCertification,
  isCertificationUnlocked,
  getCertificationStatus,
  isCertificationCompleted,
} from '../../../utils/certificationProgress';
import {
  awardCertificationAchievement,
  getCertificationBadgeFromUser,
} from '../../../services/achievementService';
import { LEVEL_CLASS } from '../certificationUi';

const CertificationCompletionScreen = ({ certification, userId }) => {
  const { user, updateUser } = useAuth();
  const progress = getCertificationProgress(userId, certification.id);
  const finalResult = getFinalAssessmentResult(userId, certification.id);
  const simulation = getCertificationSimulation(certification.id);
  const nextCert = getNextCertification(certification.id);
  const nextUnlocked = nextCert ? isCertificationUnlocked(userId, nextCert.id, user) : false;
  const nextStatus = nextCert ? getCertificationStatus(userId, nextCert.id, user) : null;

  const earnedBadge = getCertificationBadgeFromUser(user, certification.id)
    || normalizeBadge({
      name: certification.badge?.name,
      description: `Completed ${certification.title}`,
      tier: certification.badge?.tier,
      category: 'certification',
    });

  useEffect(() => {
    if (!userId || !user || !isCertificationCompleted(userId, certification.id)) return;

    const existing = getCertificationBadgeFromUser(user, certification.id);
    if (existing) return;

    awardCertificationAchievement(certification.id)
      .then((data) => {
        if (data?.user) updateUser(data.user);
      })
      .catch((error) => {
        console.error('Certification achievement sync failed:', error);
      });
  }, [userId, user, certification.id, updateUser]);

  const completionDate = progress.completedAt
    ? new Date(progress.completedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="cert-complete">
      <div className="cert-complete__inner">
        <p className="cert-complete__eyebrow">CONGRATULATIONS</p>
        <h1 className="cert-complete__title">{certification.title}</h1>
        <p className="cert-complete__subtitle">
          You have successfully completed this GuardUP certification.
        </p>

        <div className="cert-complete__badge">
          <div className="cert-complete__badge-inner cert-complete__badge-inner--earned">
            <Badge badge={earnedBadge} size="xl" interactive={false} />
            <p className="cert-complete__badge-tier">
              {(earnedBadge.tierLabel || certification.badge?.tier || 'CERTIFIED').toString().toUpperCase()}
            </p>
            <p className="cert-complete__badge-name">{earnedBadge.name || certification.badge?.name}</p>
            <p className="cert-complete__badge-issuer">{certification.certificate?.issuer}</p>
          </div>
          {getCertificationBadgeFromUser(user, certification.id) ? (
            <p className="cert-complete__badge-note">Achievement unlocked and saved to your profile.</p>
          ) : (
            <p className="cert-complete__badge-note">Syncing achievement to your profile…</p>
          )}
        </div>

        <div className="cert-complete__stats">
          <div className="cert-complete__stat">
            <p className="cert-complete__stat-label">Final score</p>
            <p className="cert-complete__stat-value">
              {finalResult ? `${finalResult.percentage}%` : '—'}
            </p>
          </div>
          <div className="cert-complete__stat">
            <p className="cert-complete__stat-label">Completion date</p>
            <p className="cert-complete__stat-value">{completionDate}</p>
          </div>
          <div className="cert-complete__stat">
            <p className="cert-complete__stat-label">Certification level</p>
            <p className="cert-complete__stat-value">
              <span className={LEVEL_CLASS[certification.level] ?? 'cert-level'}>
                {certification.level}
              </span>
            </p>
          </div>
        </div>

        <section className="cert-complete__section">
          <h2 className="cert-complete__section-title">Skills demonstrated</h2>
          <ul className="cert-learn-list">
            {certification.learningObjectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>

        {simulation && !simulation.metadata?.comingSoon && (
          <section className="cert-complete__section cert-complete__section--inline">
            <Gamepad2 size={20} />
            <div>
              <p className="cert-complete__section-title">Simulation completed</p>
              <p className="cert-complete__section-text">
                {simulation.metadata?.simulationLabel || simulation.title}
              </p>
            </div>
          </section>
        )}

        <div className="cert-complete__cert-actions">
          <button type="button" className="cert-btn cert-btn--ghost cert-btn--disabled" disabled>
            <Download size={16} />
            Certificate Download — Coming Soon
          </button>
          <button type="button" className="cert-btn cert-btn--secondary" disabled title="Visual placeholder only">
            <Award size={16} />
            View Certificate (Preview)
          </button>
        </div>

        <div className="cert-complete__actions">
          <Link to={`/dashboard/certifications/${certification.id}`} className="cert-btn cert-btn--ghost">
            View certification details
          </Link>
          {nextCert && nextUnlocked && nextStatus !== 'locked' && (
            <Link
              to={`/dashboard/certifications/${nextCert.id}`}
              className="cert-btn cert-btn--primary"
            >
              Continue to Next Certification
              <ChevronRight size={16} />
            </Link>
          )}
          <Link to="/dashboard/certifications" className="cert-btn cert-btn--ghost">
            Back to catalog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificationCompletionScreen;
