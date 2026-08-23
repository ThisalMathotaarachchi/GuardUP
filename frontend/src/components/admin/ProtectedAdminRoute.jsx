import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLoadingState from './AdminLoadingState';

const ProtectedAdminRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();
  const { user, loading: userLoading } = useAuth();
  const location = useLocation();

  if (loading || userLoading) {
    return <AdminLoadingState message="Verifying administrator access..." />;
  }

  if (user && !admin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedAdminRoute;
