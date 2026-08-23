import { useEffect, useState } from 'react';
import { Mail, MessageSquare, Shield, Bell } from 'lucide-react';

const APP_ICONS = {
  mail: Mail,
  chat: MessageSquare,
  security: Shield,
};

const DISMISS_MS = 5500;
const FADE_MS = 4800;

const NotificationItem = ({ notification, onOpen, onDismiss }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setExiting(true), FADE_MS);
    const dismissTimer = window.setTimeout(() => onDismiss?.(notification.id), DISMISS_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(dismissTimer);
    };
  }, [notification.id, onDismiss]);

  const Icon = APP_ICONS[notification.app] || Bell;
  const tone = notification.app === 'security' ? 'alert' : 'info';

  return (
    <div
      className={`lr-notifications__item lr-notifications__item--${tone} ${exiting ? 'lr-notifications__item--exit' : ''}`}
      role="status"
    >
      <button
        type="button"
        className="lr-notifications__body"
        onClick={() => onOpen?.(notification)}
      >
        <span className="lr-notifications__icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        <span className="lr-notifications__content">
          <span className="lr-notifications__app">{notification.title}</span>
          {notification.subtitle && (
            <span className="lr-notifications__subtitle">{notification.subtitle}</span>
          )}
          <span className="lr-notifications__preview">{notification.body}</span>
        </span>
      </button>
      <button
        type="button"
        className="lr-notifications__close"
        onClick={() => onDismiss?.(notification.id)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
};

const NotificationCenter = ({ notifications = [], onOpen, onDismiss }) => {
  if (!notifications.length) return null;

  return (
    <div className="lr-notifications" aria-live="polite">
      {notifications.slice(-3).map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onOpen={onOpen}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

export default NotificationCenter;
