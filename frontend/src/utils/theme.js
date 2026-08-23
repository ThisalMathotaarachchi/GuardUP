export const THEME_STORAGE_KEY = 'guardup-theme';

export const THEME_OPTIONS = ['dark', 'light', 'system'];

export const getStoredThemePreference = () => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (THEME_OPTIONS.includes(stored)) return stored;
  return 'dark';
};

export const resolveTheme = (preference) => {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return preference === 'light' ? 'light' : 'dark';
};

export const applyThemeToDocument = (preference = getStoredThemePreference()) => {
  const resolved = resolveTheme(preference);
  const root = document.documentElement;

  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.dataset.theme = preference;
  root.style.colorScheme = resolved;

  return resolved;
};

export const initTheme = () => applyThemeToDocument(getStoredThemePreference());
