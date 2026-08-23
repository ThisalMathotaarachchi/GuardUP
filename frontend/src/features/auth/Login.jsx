import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react';
import PageShell from '../../components/common/PageShell';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      <div className="auth-glass auth-card workspace-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted mt-2">Sign in to continue your cybersecurity journey</p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-light pl-10" placeholder="you@example.com" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-light pl-10" placeholder="••••••••" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            <LogIn size={20} />{loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-muted text-center mt-6">
          Don&apos;t have an account? <Link to="/register" className="text-accent font-medium hover:underline transition">Sign Up</Link>
        </p>
        <p className="text-center mt-4">
          <Link to="/admin/login" className="link-subtle text-sm">
            Login as Administrator
          </Link>
        </p>
      </div>
    </PageShell>
  );
};

export default Login;
