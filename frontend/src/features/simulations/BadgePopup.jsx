import { useEffect } from 'react';
import Badge, { normalizeBadge } from '../../components/common/Badge';

const BadgePopup = ({
  badges,
  onClose,
  autoDismissMs = 4000,
  variant = 'toast',
}) => {
  useEffect(() => {
    if (variant === 'celebration' || !badges?.length) return;
    const timer = setTimeout(() => onClose?.(), autoDismissMs);
    return () => clearTimeout(timer);
  }, [badges, onClose, autoDismissMs, variant]);

  if (!badges?.length) return null;

  const normalized = badges.map(normalizeBadge);
  const primary = normalized[0];

  if (variant === 'celebration') {
    return (
      <div
        className="badge-celebration-overlay"
        role="dialog"
        aria-labelledby="badge-celebration-title"
        aria-modal="true"
      >
        <div
          className="badge-celebration-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <p id="badge-celebration-title" className="badge-celebration-heading">
            {normalized.length > 1 ? 'Badges Earned' : 'Badge Earned'}
          </p>
          <div className="badge-celebration-row">
            {normalized.map((b, i) => (
              <div key={i} className="badge-celebration-item">
                <Badge badge={b} size="md" interactive={false} pop={false} />
                <p className="badge-celebration-name">{b.name}</p>
                {b.description && (
                  <p className="badge-celebration-desc">{b.description}</p>
                )}
                <p className="badge-celebration-tier">{b.tierLabel}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="badge-celebration-continue btn-primary py-2.5 px-6"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-[160] pointer-events-none">
      <div
        className="pointer-events-auto cursor-pointer badge-toast-glow flex flex-col items-center text-center rounded-2xl px-4 py-3 min-w-[140px] max-w-[180px]"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClose?.()}
      >
        <Badge badge={primary} size="sm" interactive={false} pop={false} />
        <p className="text-[11px] font-semibold text-white mt-2 leading-tight">{primary.name}</p>
        {primary.description && (
          <p className="text-[10px] mt-1 leading-snug line-clamp-2" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
            {primary.description}
          </p>
        )}
        {normalized.length > 1 && (
          <p className="text-[10px] mt-1" style={{ color: '#10B981' }}>+{normalized.length - 1} more</p>
        )}
      </div>
    </div>
  );
};

export default BadgePopup;
