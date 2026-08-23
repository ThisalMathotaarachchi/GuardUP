
const ACTIVE_ACCOUNT_KEY = 'guardup-active-account';

export const normalizeAccountEmail = (email) => email?.toLowerCase?.()?.trim() || '';

export const setActiveAccount = (user) => {
  const email = normalizeAccountEmail(user?.email);
  if (email) {
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, email);
  }
};

export const clearActiveAccount = () => {
  localStorage.removeItem(ACTIVE_ACCOUNT_KEY);
};

export const getActiveAccountKey = () => localStorage.getItem(ACTIVE_ACCOUNT_KEY) || 'guest';

export const buildAccountStorageKey = (prefix) => `${prefix}-${getActiveAccountKey()}`;
