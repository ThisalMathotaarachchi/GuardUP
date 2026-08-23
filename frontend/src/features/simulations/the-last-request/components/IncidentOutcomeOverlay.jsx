import { OUTCOME_MESSAGES } from '../../../../data/simulations/last-request/storyEvents';

const IncidentOutcomeOverlay = ({ outcomeType, onFinished }) => {
  if (!outcomeType) return null;
  const msg = OUTCOME_MESSAGES[outcomeType];

  return (
    <div className="lr-outcome">
      <div className="lr-outcome__panel">
        <p className="lr-outcome__title">{msg?.title}</p>
        <p className="lr-outcome__body">{msg?.body}</p>
        <button type="button" className="lr-outcome__continue" onClick={onFinished}>
          View incident report
        </button>
      </div>
    </div>
  );
};

export default IncidentOutcomeOverlay;
