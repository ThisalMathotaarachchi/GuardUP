import { useCallback, useState } from 'react';

const APP_IDS = ['mail', 'chat', 'browser', 'files', 'directory', 'security'];

export const useWorkplaceApps = () => {
  const [openApps, setOpenApps] = useState({});
  const [focusedApp, setFocusedApp] = useState(null);
  const [zCounter, setZCounter] = useState(10);

  const openApp = useCallback((appId) => {
    setOpenApps((prev) => ({ ...prev, [appId]: { minimized: false } }));
    setZCounter((z) => z + 1);
    setFocusedApp(appId);
  }, []);

  const closeApp = useCallback((appId) => {
    setOpenApps((prev) => {
      const next = { ...prev };
      delete next[appId];
      return next;
    });
    setFocusedApp((current) => (current === appId ? null : current));
  }, []);

  const focusApp = useCallback((appId) => {
    if (!openApps[appId]) return;
    setZCounter((z) => z + 1);
    setFocusedApp(appId);
    setOpenApps((prev) => ({ ...prev, [appId]: { ...prev[appId], minimized: false } }));
  }, [openApps]);

  const minimizeApp = useCallback((appId) => {
    setOpenApps((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], minimized: true },
    }));
    setFocusedApp((current) => (current === appId ? null : current));
  }, []);

  const getZIndex = useCallback(
    (appId) => (focusedApp === appId ? zCounter : APP_IDS.indexOf(appId) + 1),
    [focusedApp, zCounter]
  );

  return {
    openApps,
    focusedApp,
    openApp,
    closeApp,
    focusApp,
    minimizeApp,
    getZIndex,
    isOpen: (appId) => Boolean(openApps[appId]),
    isMinimized: (appId) => openApps[appId]?.minimized,
  };
};

export default useWorkplaceApps;
