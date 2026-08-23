import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  THEME_STORAGE_KEY,
  THEME_OPTIONS,
  applyThemeToDocument,
  getStoredThemePreference,
  resolveTheme,
} from '../utils/theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getStoredThemePreference);
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(getStoredThemePreference()));

  useEffect(() => {
    const resolved = applyThemeToDocument(theme);
    setResolvedTheme(resolved);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return undefined;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolved = applyThemeToDocument('system');
      setResolvedTheme(resolved);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (nextTheme) => {
    if (THEME_OPTIONS.includes(nextTheme)) {
      setThemeState(nextTheme);
    }
  };

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme: () => setThemeState((current) => (resolveTheme(current) === 'dark' ? 'light' : 'dark')),
    setLightTheme: () => setThemeState('light'),
    setDarkTheme: () => setThemeState('dark'),
    isDark: resolvedTheme === 'dark',
  }), [theme, resolvedTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
