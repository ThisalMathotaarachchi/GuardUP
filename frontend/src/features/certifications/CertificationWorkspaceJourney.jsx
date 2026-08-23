import { Check, Lock, Circle } from 'lucide-react';
import { ACTIVITY_TYPE_CONFIG, getActivityIcon } from './certificationUi';

const STATE_LABELS = {
  completed: 'Completed',
  current: 'Current',
  locked: 'Locked',
  coming_soon: 'Coming Soon',
  available: 'Upcoming',
};

const CertificationWorkspaceJourney = ({
  activityStates,
  currentActivityId,
  completedCount,
  totalActivities,
  progressPercent,
}) => (
  <aside className="cert-ws-journey">
    <div className="cert-ws-journey__header">
      <p className="cert-ws-journey__title">Certification Journey</p>
      <p className="cert-ws-journey__count">
        Step {completedCount + 1 > totalActivities ? totalActivities : Math.min(completedCount + 1, totalActivities)} of {totalActivities}
        {' · '}
        {completedCount} completed
      </p>
      <div className="cert-ws-journey__track">
        <div className="cert-ws-journey__fill" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>

    <ol className="cert-ws-journey__list">
      {activityStates.map(({ activity, state }, index) => {
        const TypeIcon = getActivityIcon(activity.type);
        const typeConfig = ACTIVITY_TYPE_CONFIG[activity.type];
        const isCurrent = activity.id === currentActivityId;
        const stepNum = String(index + 1).padStart(2, '0');

        let StateIcon = Circle;
        if (state === 'completed') StateIcon = Check;
        else if (state === 'locked' || state === 'coming_soon') StateIcon = Lock;

        return (
          <li
            key={activity.id}
            className={`cert-ws-journey__item cert-ws-journey__item--${state} ${isCurrent ? 'cert-ws-journey__item--active' : ''}`}
          >
            <div className="cert-ws-journey__step-num">{stepNum}</div>
            <div className="cert-ws-journey__rail-marker">
              <StateIcon size={12} />
            </div>
            <div className="cert-ws-journey__body">
              <div className="cert-ws-journey__meta">
                <TypeIcon size={12} />
                <span>{typeConfig?.shortLabel || activity.type}</span>
                {isCurrent && <span className="cert-ws-journey__current-badge">You are here</span>}
              </div>
              <p className="cert-ws-journey__label">{activity.title}</p>
              <p className="cert-ws-journey__state">{STATE_LABELS[state] || state}</p>
            </div>
          </li>
        );
      })}
    </ol>
  </aside>
);

export default CertificationWorkspaceJourney;
