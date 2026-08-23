import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import PageShell from '../../components/common/PageShell';
import Logo from '../../components/common/Logo';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, loading: authLoading } = useAdminAuth();

  useEffect(() => {
    document.title = 'Administrator Login — GuardUP';
  }, []);

  if (!authLoading && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) setError(result.message);
    setLoading(false);
  };

  return (
    <PageShell variant="auth">
      <div className="auth-glass auth-card workspace-card admin-login-card">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="md" />
          </div>
          <p className="admin-login-badge">Administrator Access</p>
          <h1 className="text-2xl font-bold mt-4">Sign in to Admin Console</h1>
          <p className="text-muted mt-2 text-sm">
            Restricted area for platform administrators only
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Administrator email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-light pl-10"
                placeholder="admin@guardup.local"
                required
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-light pl-10"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            <LogIn size={20} />
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <Link to="/login" className="admin-login-back link-subtle">
          <ArrowLeft size={14} />
          Back to User Login
        </Link>
      </div>
    </PageShell>
  );
};

export default AdminLogin;
