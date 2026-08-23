const AppToolbar = ({ tabs = [], activeId, onSelect, ariaLabel = 'Application navigation' }) => (
  <nav className="lr-app-toolbar" aria-label={ariaLabel}>
    {tabs.map((tab) => (
      <button
        key={tab.id}
        type="button"
        className={`lr-app-toolbar__tab ${activeId === tab.id ? 'lr-app-toolbar__tab--active' : ''}`}
        onClick={() => onSelect?.(tab.id)}
        disabled={tab.disabled}
        aria-current={activeId === tab.id ? 'page' : undefined}
      >
        {tab.label}
        {tab.badge > 0 && <span className="lr-app-toolbar__badge">{tab.badge}</span>}
      </button>
    ))}
  </nav>
);

export default AppToolbar;
