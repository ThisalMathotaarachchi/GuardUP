const NotificationToast = ({ notification, onOpen, onDismiss }) => {
  if (!notification) return null;

  return (
    <div className="lr-toast" role="status">
      <button type="button" className="lr-toast__body" onClick={() => onOpen?.(notification)}>
        <span className="lr-toast__title">{notification.title}</span>
        <span className="lr-toast__text">{notification.body}</span>
      </button>
      <button type="button" className="lr-toast__dismiss" onClick={() => onDismiss?.(notification.id)} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
};

export default NotificationToast;
