import {
  Mail,
  MessageSquare,
  Globe,
  FolderOpen,
  Users,
  Shield,
} from 'lucide-react';
import { DESKTOP_APPS } from '../../../../data/simulations/last-request/simIdentity';
import { formatSimTime } from '../../../../data/simulations/last-request/lastRequestScenario';

const ICONS = {
  mail: Mail,
  chat: MessageSquare,
  browser: Globe,
  files: FolderOpen,
  directory: Users,
  security: Shield,
};

const WorkplaceDesktop = ({ simMinutes, unread, onOpenApp }) => (
  <div className="lr-desktop-surface" aria-hidden="false">
    <div className="lr-desktop-surface__wallpaper" aria-hidden="true">
      <div className="lr-desktop-surface__wallpaper-glow" />
      <div className="lr-desktop-surface__wallpaper-brand">Aurelia Systems</div>
    </div>

    <div className="lr-desktop-surface__widget">
      <p className="lr-desktop-surface__time">{formatSimTime(simMinutes, { twelveHour: true })}</p>
      <p className="lr-desktop-surface__date">Monday</p>
      <p className="lr-desktop-surface__location">Aurelia Systems — Colombo</p>
    </div>

    <nav className="lr-desktop-surface__icons" aria-label="Desktop applications">
      {DESKTOP_APPS.map(({ id, label, shortLabel }) => {
        const Icon = ICONS[id];
        const badge = unread[id] || 0;
        return (
          <button
            key={id}
            type="button"
            className="lr-desktop-surface__icon"
            onDoubleClick={() => onOpenApp(id)}
            onClick={() => onOpenApp(id)}
            aria-label={`Open ${label}${badge ? `, ${badge} unread` : ''}`}
          >
            <span className="lr-desktop-surface__icon-graphic">
              <Icon size={22} strokeWidth={1.5} />
              {badge > 0 && <span className="lr-desktop-surface__icon-badge">{badge}</span>}
            </span>
            <span className="lr-desktop-surface__icon-label">{shortLabel}</span>
          </button>
        );
      })}
    </nav>
  </div>
);

export default WorkplaceDesktop;
