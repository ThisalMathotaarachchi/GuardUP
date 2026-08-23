export const COMPACT_MODE_CLASS = 'compact-mode';

export const applyCompactMode = (enabled) => {
  document.documentElement.classList.toggle(COMPACT_MODE_CLASS, Boolean(enabled));
};
