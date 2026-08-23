import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  getCertificationProgressPercent,
  getActivityPosition,
  markActivityComplete,
  getNextActivity,
  resolveWorkspaceActivity,
  isCertificationCompleted,
  getActivityProgressStates,
  getCertificationSummary,
  QUIZ_PASS_THRESHOLD,
} from '../../utils/certificationProgress';
import { ACTIVITY_TYPES } from '../../data/certifications';
import { getQuizResult } from '../../utils/quizStorage';
import useAchievementAward from '../../hooks/useAchievementAward';
import BadgePopup from '../simulations/BadgePopup';
import CertificationWorkspaceShell from './CertificationWorkspaceShell';
import CertificationIntroActivity from './activities/CertificationIntroActivity';
import CertificationArticleActivity from './activities/CertificationArticleActivity';
import CertificationVideoActivity from './activities/CertificationVideoActivity';
import CertificationQuizActivity from './activities/CertificationQuizActivity';
import CertificationSimulationBriefing from './activities/CertificationSimulationBriefing';
import CertificationDebriefActivity from './activities/CertificationDebriefActivity';
import CertificationCompletionScreen from './activities/CertificationCompletionScreen';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const CertificationActivityWorkspace = () => {
  const { certificationId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = user?.id;
  const requestedActivityId = location.state?.activityId;
  const { award, celebrationBadges, dismissCelebration, hasCelebration } = useAchievementAward();
  const [resolved, setResolved] = useState({ kind: 'loading' });

  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      if (!userId || !certificationId) {
        if (!cancelled) setResolved({ kind: 'not_found' });
        return;
      }

      try {
        const result = await resolveWorkspaceActivity(
          userId,
          certificationId,
          requestedActivityId,
          user
        );
        if (!cancelled) setResolved(result);
      } catch (error) {
        console.error('Failed to resolve certification workspace:', error);
        if (!cancelled) setResolved({ kind: 'not_found' });
      }
    };

    resolve();

    return () => {
      cancelled = true;
    };
  }, [
    userId,
    certificationId,
    requestedActivityId,
    user,
    user?.simulationsCompleted?.beginner,
    user?.simulationsCompleted?.advanced,
    user?.simulationsCompleted?.['sim-the-breach'],
  ]);

  const celebrationOverlay = hasCelebration ? (
    <BadgePopup
      badges={celebrationBadges}
      variant="celebration"
      autoDismissMs={3500}
      onClose={dismissCelebration}
    />
  ) : null;

  if (resolved.kind === 'loading') {
    return (
      <div className="cert-page">
        <div className="cert-page__inner">
          <p className="text-body text-sm">Loading certification activity...</p>
        </div>
      </div>
    );
  }

  if (resolved.kind === 'not_found') {
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

  if (resolved.kind === 'locked') {
    return (
      <div className="cert-page">
        <div className="cert-page__inner">
          <Link to={`/dashboard/certifications/${certificationId}`} className="cert-back-link">
            <ArrowLeft size={16} />
            Back to certification
          </Link>
          <div className="cert-workspace-card">
            <AlertCircle className="text-warning mb-3" size={28} />
            <h1 className="text-xl font-bold text-heading mb-2">Certification locked</h1>
            <p className="text-body text-sm">Complete prerequisite certifications before starting this path.</p>
          </div>
        </div>
      </div>
    );
  }

  if (resolved.kind === 'completed') {
    return (
      <>
        {celebrationOverlay}
        <CertificationCompletionScreen
          certification={resolved.certification}
          userId={userId}
        />
      </>
    );
  }

  if (resolved.kind === 'locked_activity') {
    return (
      <div className="cert-page">
        <div className="cert-page__inner">
          <Link to={`/dashboard/certifications/${certificationId}`} className="cert-back-link">
            <ArrowLeft size={16} />
            Back to certification
          </Link>
          <div className="cert-workspace-card">
            <AlertCircle className="text-warning mb-3" size={28} />
            <h1 className="text-xl font-bold text-heading mb-2">Activity locked</h1>
            <p className="text-body text-sm mb-4">
              Complete earlier activities in this certification before accessing this step.
            </p>
            <button
              type="button"
              onClick={() => navigate(`/dashboard/certifications/${certificationId}/activity`, { replace: true })}
              className="cert-btn cert-btn--primary"
            >
              Go to current activity
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (resolved.kind === 'coming_soon') {
    const { certification, activity } = resolved;
    return (
      <>
        {celebrationOverlay}
        <CertificationWorkspaceShell
          certification={certification}
          activity={activity}
          activityPosition={getActivityPosition(certificationId, activity.id)}
          progressPercent={getCertificationProgressPercent(userId, certificationId, user)}
        >
          <div className="cert-workspace-soon">
            <AlertCircle size={18} />
            <p>This activity is planned for a future release and is not yet available.</p>
          </div>
        </CertificationWorkspaceShell>
      </>
    );
  }

  const { certification, activity, mode } = resolved;
  const isReview = mode === 'review';
  const activityPosition = getActivityPosition(certificationId, activity.id);
  const progressPercent = getCertificationProgressPercent(userId, certificationId, user);
  const certSummary = getCertificationSummary(userId, certificationId, user);
  const activityStates = getActivityProgressStates(userId, certificationId, user);

  const advanceAfterComplete = () => {
    if (isCertificationCompleted(userId, certificationId)) {
      navigate(`/dashboard/certifications/${certificationId}/activity`, { replace: true });
      return;
    }
    const following = getNextActivity(userId, certificationId, user);
    if (following) {
      navigate(`/dashboard/certifications/${certificationId}/activity`, {
        state: { activityId: following.id },
        replace: true,
      });
    } else {
      navigate(`/dashboard/certifications/${certificationId}/activity`, { replace: true });
    }
  };

  const awardCertificationIfNeeded = async (justCompleted) => {
    if (justCompleted) {
      await award({ type: 'certification', certificationId });
    }
  };

  const handleMarkAndAdvance = async () => {
    const { justCompleted } = await markActivityComplete(userId, certificationId, activity.id);
    await awardCertificationIfNeeded(justCompleted);
    advanceAfterComplete();
  };

  const handleQuizContinue = async () => {
    const result = getQuizResult(userId, activity.quizId);
    const threshold = activity.metadata?.passThreshold ?? QUIZ_PASS_THRESHOLD;
    if (result && result.percentage >= threshold) {
      await award({
        type: 'quiz',
        quizId: activity.quizId,
        percentage: result.percentage,
        passed: true,
      });
      const { justCompleted } = await markActivityComplete(userId, certificationId, activity.id);
      await awardCertificationIfNeeded(justCompleted);
    }
    advanceAfterComplete();
  };

  const handleLaunchSimulation = () => {
    const route = activity.metadata?.route;
    if (!route) return;
    navigate(route, {
      state: {
        from: 'certification',
        certificationId,
        activityId: activity.id,
      },
    });
  };

  const renderActivity = () => {
    switch (activity.type) {
      case ACTIVITY_TYPES.INTRO:
        return (
          <CertificationIntroActivity
            certification={certification}
            activity={activity}
            onBegin={handleMarkAndAdvance}
          />
        );

      case ACTIVITY_TYPES.ARTICLE:
        return (
          <CertificationArticleActivity
            activity={activity}
            resourceId={activity.resourceId}
            onContinue={isReview ? advanceAfterComplete : handleMarkAndAdvance}
            isReview={isReview}
          />
        );

      case ACTIVITY_TYPES.VIDEO:
        return (
          <CertificationVideoActivity
            resourceId={activity.resourceId}
            onContinue={isReview ? advanceAfterComplete : handleMarkAndAdvance}
            isReview={isReview}
          />
        );

      case ACTIVITY_TYPES.QUIZ:
        return (
          <CertificationQuizActivity
            quizId={activity.quizId}
            activity={activity}
            userId={userId}
            variant="quiz"
            onContinue={handleQuizContinue}
            isReview={isReview}
          />
        );

      case ACTIVITY_TYPES.FINAL_ASSESSMENT:
        return (
          <CertificationQuizActivity
            quizId={activity.quizId}
            activity={activity}
            userId={userId}
            variant="final"
            onContinue={handleQuizContinue}
            isReview={isReview}
          />
        );

      case ACTIVITY_TYPES.SIMULATION:
        return (
          <CertificationSimulationBriefing
            certification={certification}
            activity={activity}
            user={user}
            onLaunch={handleLaunchSimulation}
            onContinue={advanceAfterComplete}
            isReview={isReview}
          />
        );

      case ACTIVITY_TYPES.DEBRIEF:
        return (
          <CertificationDebriefActivity
            certification={certification}
            activity={activity}
            user={user}
            onContinue={handleMarkAndAdvance}
          />
        );

      default:
        return (
          <div className="cert-learn-empty">
            <p>This activity type is not yet supported.</p>
          </div>
        );
    }
  };

  return (
    <>
      {celebrationOverlay}
      <CertificationWorkspaceShell
        certification={certification}
        activity={activity}
        activityPosition={activityPosition}
        progressPercent={progressPercent}
        activityStates={activityStates}
        completedCount={certSummary?.completedCount ?? 0}
        totalActivities={certSummary?.totalActivities ?? 0}
      >
        {renderActivity()}
      </CertificationWorkspaceShell>
    </>
  );
};

export default CertificationActivityWorkspace;
