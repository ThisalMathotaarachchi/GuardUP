import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ACTIVITY_TYPE_CONFIG } from './certificationUi';
import CertificationWorkspaceJourney from './CertificationWorkspaceJourney';

const findScrollContainer = (element) => {
  let node = element?.parentElement;
  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const CertificationWorkspaceShell = ({
  certification,
  activity,
  activityPosition,
  progressPercent,
  activityStates,
  completedCount,
  totalActivities,
  children,
  footer,
}) => {
  const rootRef = useRef(null);
  const typeConfig = ACTIVITY_TYPE_CONFIG[activity.type] ?? ACTIVITY_TYPE_CONFIG.intro;

  useLayoutEffect(() => {
    const scrollContainer = findScrollContainer(rootRef.current);
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [activity.id]);

  return (
    <div className="cert-learn" ref={rootRef}>
      <div className="cert-learn__inner">
        <Link
          to={`/dashboard/certifications/${certification.id}`}
          className="cert-learn__back"
        >
          <ArrowLeft size={16} />
          Back to certification
        </Link>

        <header className="cert-learn__header">
          <p className="cert-learn__cert-name">{certification.title.toUpperCase()}</p>
          {activityPosition && (
            <p className="cert-learn__step">
              Step {activityPosition.index} of {activityPosition.total}
            </p>
          )}
          <div className="cert-learn__progress-track" aria-hidden="true">
            <div
              className="cert-learn__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="cert-learn__type">{typeConfig.label}</p>
          <h1 className="cert-learn__title">{activity.title}</h1>
        </header>

        <div className="cert-learn__mobile-progress">
          <CertificationWorkspaceJourney
            activityStates={activityStates}
            currentActivityId={activity.id}
            completedCount={completedCount}
            totalActivities={totalActivities}
            progressPercent={progressPercent}
          />
        </div>

        <div className="cert-learn__layout">
          <div className="cert-learn__main">
            <div className="cert-learn__content">{children}</div>
            {footer && <footer className="cert-learn__footer">{footer}</footer>}
          </div>

          <div className="cert-learn__sidebar">
            <CertificationWorkspaceJourney
              activityStates={activityStates}
              currentActivityId={activity.id}
              completedCount={completedCount}
              totalActivities={totalActivities}
              progressPercent={progressPercent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationWorkspaceShell;
