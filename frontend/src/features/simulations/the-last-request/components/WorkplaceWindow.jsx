const WorkplaceWindow = ({
  title,
  appId,
  icon: Icon,
  open,
  minimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  children,
  style,
  width = 'min(680px, 88vw)',
  height = 'min(460px, calc(100vh - 5.5rem))',
}) => {
  if (!open || minimized) return null;

  return (
    <div
      className="lr-window"
      style={{
        zIndex,
        width,
        height,
        top: style?.top,
        left: style?.left,
        right: style?.right,
        bottom: style?.bottom,
      }}
      onMouseDown={() => onFocus?.(appId)}
      role="dialog"
      aria-label={title}
    >
      <div className="lr-window__titlebar">
        <div className="lr-window__title-group">
          {Icon && (
            <span className="lr-window__app-icon" aria-hidden="true">
              <Icon size={14} strokeWidth={1.75} />
            </span>
          )}
          <span className="lr-window__title">{title}</span>
        </div>
        <div className="lr-window__controls">
          <button type="button" className="lr-window__btn" onClick={() => onMinimize?.(appId)} aria-label="Minimize">
            —
          </button>
          <button type="button" className="lr-window__btn" aria-label="Maximize" onClick={() => onFocus?.(appId)}>
            ▢
          </button>
          <button type="button" className="lr-window__btn lr-window__btn--close" onClick={() => onClose?.(appId)} aria-label="Close">
            ×
          </button>
        </div>
      </div>
      <div className="lr-window__body">{children}</div>
    </div>
  );
};

export default WorkplaceWindow;
