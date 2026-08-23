import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../services/adminApi';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const navigate = useNavigate();

  const fetchAdmin = useCallback(async () => {
    try {
      const response = await adminApi.get('/auth/me');
      setAdmin(response.data.data.admin);
    } catch {
      localStorage.removeItem('adminToken');
      setToken(null);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchAdmin();
    } else {
      setLoading(false);
    }
  }, [token, fetchAdmin]);

  const login = async (email, password) => {
    try {
      const response = await adminApi.post('/auth/login', { email, password });
      const { admin: adminData, token: adminToken } = response.data.data;
      localStorage.setItem('adminToken', adminToken);
      setToken(adminToken);
      setAdmin(adminData);
      navigate('/admin/dashboard');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Administrator login failed',
      };
    }
  };

  const logout = async () => {
    try {
      await adminApi.post('/auth/logout');
    } catch {
      
    }
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    navigate('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: Boolean(admin) }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
