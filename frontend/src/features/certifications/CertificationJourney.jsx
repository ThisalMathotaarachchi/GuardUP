import { Award } from 'lucide-react';
import { ACTIVITY_TYPE_CONFIG, ACTIVITY_STATE_CONFIG, getActivityIcon } from './certificationUi';

const CertificationJourney = ({ activityStates, onActivitySelect }) => (
  <div className="cert-journey">
    {activityStates.map(({ activity, state }, index) => {
      const typeConfig = ACTIVITY_TYPE_CONFIG[activity.type] ?? ACTIVITY_TYPE_CONFIG.intro;
      const stateConfig = ACTIVITY_STATE_CONFIG[state] ?? ACTIVITY_STATE_CONFIG.locked;
      const TypeIcon = getActivityIcon(activity.type);
      const StateIcon = stateConfig.icon;
      const isLast = index === activityStates.length - 1;
      const isSelectable = (state === 'completed' || state === 'current') && onActivitySelect;

      const content = (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="cert-journey__phase">{typeConfig.phase}</span>
            <span className="cert-journey__type">{typeConfig.label}</span>
            <span className="cert-journey__state">
              <StateIcon size={12} />
              {stateConfig.label}
            </span>
          </div>
          <h3 className="cert-journey__title">{activity.title}</h3>
          <p className="cert-journey__description">{activity.description}</p>
          <p className="cert-journey__duration">{activity.estimatedDuration}</p>
          {activity.metadata?.comingSoon && (
            <p className="cert-journey__soon">Available in a future release</p>
          )}
        </>
      );

      return (
        <div key={activity.id} className="cert-journey__step">
          <div className="cert-journey__rail">
            <div className={`cert-journey-node ${stateConfig.className}`}>
              <TypeIcon size={18} />
            </div>
            {!isLast && (
              <div className={`cert-journey__connector ${state === 'completed' ? 'cert-journey__connector--done' : ''}`} />
            )}
          </div>

          {isSelectable ? (
            <button
              type="button"
              className={`cert-journey__content cert-journey__content--link ${stateConfig.className}`}
              onClick={() => onActivitySelect(activity.id)}
            >
              {content}
            </button>
          ) : (
            <div className={`cert-journey__content ${stateConfig.className}`}>
              {content}
            </div>
          )}
        </div>
      );
    })}

    <div className="cert-journey__step cert-journey__step--certified">
      <div className="cert-journey__rail">
        <div className="cert-journey-node cert-journey-node--certified">
          <Award size={18} />
        </div>
      </div>
      <div className="cert-journey__content cert-journey-node--certified">
        <span className="cert-journey__phase">CERTIFIED</span>
        <h3 className="cert-journey__title">Earn your certificate</h3>
        <p className="cert-journey__description">
          Complete all activities and pass the final assessment to receive your GuardUP certification.
        </p>
      </div>
    </div>
  </div>
);

export default CertificationJourney;
