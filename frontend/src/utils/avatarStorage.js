import { buildAccountStorageKey } from './accountStorageKey';

const STORAGE_PREFIX = 'guardup-avatar';

const getStorageKey = () => buildAccountStorageKey(STORAGE_PREFIX);

export const getUserAvatarId = (userId) => {
  try {
    return localStorage.getItem(getStorageKey()) || 'defender';
  } catch {
    return 'defender';
  }
};

export const setUserAvatarId = (userId, avatarId) => {
  try {
    localStorage.setItem(getStorageKey(), avatarId);
  } catch {

  }
};
