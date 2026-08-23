import SecurityActionBar from '../SecurityActionBar';

const statusLabel = (status) => {
  if (status === 'alert') return 'Review required';
  return 'Normal';
};

const SecurityCenterApp = ({
  authEvents,
  sessions,
  activePrompt,
  onDecision,
  onReportIncident,
  onInteract,
}) => {
  const showActions = activePrompt?.context === 'security';

  return (
    <div className="lr-security">
      <header className="lr-security__header">
        <h2>Security Center</h2>
        <p>Authentication monitoring · Aurelia Systems</p>
      </header>

      <section className="lr-security__section">
        <h3>Authentication Events</h3>
        <div className="lr-security__table">
          <div className="lr-security__table-head">
            <span>Time</span>
            <span>Event</span>
            <span>Employee</span>
            <span>Location</span>
            <span>Status</span>
          </div>
          {authEvents.map((ev) => (
            <div
              key={ev.id}
              className={`lr-security__row ${ev.status === 'alert' ? 'lr-security__row--alert' : ''}`}
            >
              <span className="lr-security__time">{ev.time}</span>
              <span>{ev.type}</span>
              <span>{ev.employee || ev.account}</span>
              <span>{ev.location}</span>
              <span className={`lr-security__status lr-security__status--${ev.status}`}>
                {statusLabel(ev.status)}
              </span>
              {ev.message && <p className="lr-security__row-detail">{ev.message}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="lr-security__section">
        <h3>Active Sessions</h3>
        <ul className="lr-security__sessions">
          {sessions.map((s) => (
            <li key={s.id} className={s.suspicious ? 'lr-security__session--alert' : ''}>
              <span>{s.device}</span>
              <span>{s.location}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="lr-security__section">
        <h3>Incident Response</h3>
        <button
          type="button"
          className="lr-security__report"
          onClick={() => {
            onInteract?.();
            onReportIncident();
          }}
        >
          Report incident to Security Operations
        </button>
      </section>

      {showActions && (
        <SecurityActionBar
          decisionId={activePrompt.decisionId}
          onSelect={(decisionId, optionId) => {
            onInteract?.();
            onDecision(decisionId, optionId);
          }}
          onReportIncident={() => {
            onInteract?.();
            onReportIncident();
          }}
        />
      )}
    </div>
  );
};

export default SecurityCenterApp;
