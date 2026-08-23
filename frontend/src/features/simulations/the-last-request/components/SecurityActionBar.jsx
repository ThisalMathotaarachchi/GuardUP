import { getDecisionById } from '../../../../data/simulations/last-request/decisionWeights';

const SecurityActionBar = ({ decisionId, onSelect, onReportIncident }) => {
  const decision = getDecisionById(decisionId);

  if (decisionId === 'auth-incident' && decision) {
    return (
      <div className="lr-security__actions" role="group" aria-label="Authentication alert actions">
        <p className="lr-security__actions-lead">Respond to this authentication event</p>
        <div className="lr-security__actions-row">
          <button type="button" className="lr-security__action lr-security__action--primary" onClick={onReportIncident}>
            Report to Security Operations
          </button>
          <button
            type="button"
            className="lr-security__action"
            onClick={() => onSelect('auth-incident', 'investigate-first')}
          >
            Review session details
          </button>
          <button
            type="button"
            className="lr-security__action lr-security__action--muted"
            onClick={() => onSelect('auth-incident', 'dismiss')}
          >
            Dismiss alert
          </button>
        </div>
      </div>
    );
  }

  if (decisionId === 'final-response' && decision) {
    return (
      <div className="lr-security__actions" role="group" aria-label="Incident response actions">
        <p className="lr-security__actions-lead">Security Operations is awaiting your response</p>
        <div className="lr-security__actions-col">
          {decision.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`lr-security__action ${option.id === 'report-security' ? 'lr-security__action--primary' : ''}`}
              onClick={() => onSelect(decision.id, option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SecurityActionBar;
