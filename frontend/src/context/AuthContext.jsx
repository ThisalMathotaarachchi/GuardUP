import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { reconcileCertificationProgressWithUser, loadCertificationProgressFromServer, importLegacyCertificationProgressOnce } from '../utils/certificationProgress';
import { loadQuizResultsFromServer, importLegacyQuizResultsOnce } from '../utils/quizStorage';
import { setActiveAccount, clearActiveAccount } from '../utils/accountStorageKey';
import { applyCompactMode } from '../utils/compactMode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const hydrateUserProgress = async (userData) => {
    if (!userData) return;

    await loadCertificationProgressFromServer();
    await loadQuizResultsFromServer();
    await importLegacyCertificationProgressOnce(userData);
    await importLegacyQuizResultsOnce(userData);
    await reconcileCertificationProgressWithUser(userData.id, userData);
  };

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      const userData = response.data.data.user;
      setActiveAccount(userData);
      applyCompactMode(userData?.preferences?.compactMode);
      await hydrateUserProgress(userData);
      setUser(userData);

      if (
        userData &&
        !userData.hasTakenAssessment &&
        window.location.pathname !== '/assessment-intro' &&
        window.location.pathname !== '/assessment'
      ) {
        navigate('/assessment-intro');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data.data;
      localStorage.setItem('token', token);
      setToken(token);
      setActiveAccount(user);
      applyCompactMode(user?.preferences?.compactMode);
      await hydrateUserProgress(user);
      setUser(user);
      if (!user.hasTakenAssessment) {
        navigate('/assessment-intro');
      } else {
        navigate('/dashboard');
      }
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    clearActiveAccount();
    applyCompactMode(false);
    setToken(null);
    setUser(null);
    navigate('/');
  };

  const updateUser = (updatedUser) => {
    applyCompactMode(updatedUser?.preferences?.compactMode);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      register,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
