import {
  Mail,
  MessageSquare,
  Globe,
  FolderOpen,
  Users,
  Shield,
  Wifi,
  Bell,
  Battery,
} from 'lucide-react';
import { formatSimTime } from '../../../../data/simulations/last-request/lastRequestScenario';

const APPS = [
  { id: 'mail', label: 'Mail', icon: Mail },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'browser', label: 'Browser', icon: Globe },
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'directory', label: 'Directory', icon: Users },
  { id: 'security', label: 'Security', icon: Shield },
];

const WorkplaceTaskbar = ({
  simMinutes,
  unread,
  openApps,
  onOpenApp,
  onFocusApp,
  notificationCount = 0,
}) => (
  <footer className="lr-taskbar">
    <button type="button" className="lr-taskbar__launcher" aria-label="Application launcher">
      <span className="lr-taskbar__launcher-mark">A</span>
      <span className="lr-taskbar__brand">Aurelia</span>
    </button>

    <div className="lr-taskbar__apps">
      {APPS.map(({ id, label, icon: Icon }) => {
        const isOpen = Boolean(openApps[id]);
        const badge = unread[id] || 0;
        return (
          <button
            key={id}
            type="button"
            className={`lr-taskbar__app ${isOpen ? 'lr-taskbar__app--active' : ''}`}
            onClick={() => (isOpen ? onFocusApp(id) : onOpenApp(id))}
            aria-label={`${label}${badge ? `, ${badge} unread` : ''}`}
          >
            <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
            <span>{label}</span>
            {badge > 0 && <span className="lr-taskbar__badge">{badge}</span>}
          </button>
        );
      })}
    </div>

    <div className="lr-taskbar__tray">
      <Wifi size={14} className="lr-taskbar__tray-icon" aria-hidden="true" />
      {notificationCount > 0 && (
        <span className="lr-taskbar__tray-notif" aria-label="Recent notifications">
          <Bell size={13} />
        </span>
      )}
      <Battery size={14} className="lr-taskbar__tray-icon" aria-hidden="true" />
      <div className="lr-taskbar__clock-block">
        <span className="lr-taskbar__clock">{formatSimTime(simMinutes, { twelveHour: true })}</span>
        <span className="lr-taskbar__day">Monday</span>
      </div>
    </div>
  </footer>
);

export default WorkplaceTaskbar;
