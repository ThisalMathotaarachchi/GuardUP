import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageShell from './PageShell';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageShell variant="default" className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-lg page-subheading">Loading...</p>
      </PageShell>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
