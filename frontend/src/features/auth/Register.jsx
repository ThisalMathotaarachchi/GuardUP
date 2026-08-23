import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Check, Circle } from 'lucide-react';
import PageShell from '../../components/common/PageShell';
import { getPasswordChecks, getPasswordValidationError, PASSWORD_REQUIREMENTS } from '../../utils/passwordPolicy';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validatePassword = getPasswordChecks;

  const getStrength = (pwd) => {
    if (!pwd) return { label: '', color: '', width: 0 };
    const count = Object.values(validatePassword(pwd)).filter(Boolean).length;
    if (count <= 2) return { label: 'Weak', color: 'bg-red-500', width: 20 };
    if (count <= 3) return { label: 'Fair', color: 'bg-yellow-500', width: 50 };
    if (count <= 4) return { label: 'Good', color: 'bg-[#A1A1AA]', width: 75 };
    return { label: 'Strong', color: 'bg-green-500', width: 100 };
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setErrors({ ...errors, password: '', confirmPassword: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    const passwordError = getPasswordValidationError(formData.password);
    if (passwordError) newErrors.password = passwordError;
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    const result = await register({ email: formData.email, password: formData.password, firstName: formData.firstName, lastName: formData.lastName });
    setLoading(false);
    if (result.success) {
      navigate('/login', { replace: true });
    } else {
      setErrors({ submit: result.message || 'Registration failed' });
    }
  };

  const strength = getStrength(formData.password);
  const passwordChecks = validatePassword(formData.password);

  return (
    <PageShell variant="auth" scroll>
      <div className="auth-glass auth-card workspace-card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted mt-2">Start your cybersecurity journey</p>
        </div>
        {errors.submit && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4">
            {errors.submit}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="input-light" placeholder="First" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="input-light" placeholder="Last" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-light pl-10" placeholder="you@example.com" />
            </div>
            {errors.email && <p className="text-status-danger text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="input-light pl-10 pr-12" placeholder="Min 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FFFFFF]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            <ul className="mt-2 space-y-1" aria-live="polite">
              {PASSWORD_REQUIREMENTS.map(({ key, label }) => {
                const met = passwordChecks[key];
                return (
                  <li key={key} className={`flex items-center gap-2 text-xs ${met ? 'text-status-success' : 'text-muted'}`}>
                    {met ? <Check size={14} aria-hidden="true" /> : <Circle size={14} aria-hidden="true" />}
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">Password strength</span>
                  <span>{strength.label}</span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.08)] rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.width}%` }} />
                </div>
              </div>
            )}
            {errors.password && <p className="text-status-danger text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" size={18} />
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-light pl-10 pr-12" placeholder="Confirm your password" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#FFFFFF]">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {errors.confirmPassword && <p className="text-status-danger text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">{loading ? 'Creating account...' : 'Create Account'}</button>
        </form>
        <p className="text-muted text-center mt-6">
          Already have an account? <Link to="/login" className="text-accent font-medium hover:underline transition">Sign In</Link>
        </p>
      </div>
    </PageShell>
  );
};

export default Register;
