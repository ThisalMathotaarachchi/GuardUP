const SystemHint = ({ visible, onDismiss }) => {
  if (!visible) return null;

  return (
    <div className="lr-hint" role="status">
      <p>You have unread messages. Check your applications to see what needs attention.</p>
      <button type="button" className="lr-hint__dismiss" onClick={onDismiss} aria-label="Dismiss hint">
        ×
      </button>
    </div>
  );
};

export default SystemHint;
