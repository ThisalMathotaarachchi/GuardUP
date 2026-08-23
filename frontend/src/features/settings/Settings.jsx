import { useState, useEffect } from 'react';

import { useAuth } from '../../context/AuthContext';

import { useTheme } from '../../context/ThemeContext';

import api from '../../services/api';
import { getApiUrl } from '../../config/api';
import { applyCompactMode } from '../../utils/compactMode';
import { clearAppCache } from '../../utils/appCache';
import { displayEmail, isPrivacyModeEnabled } from '../../utils/privacyUtils';
import {
  Bell, User, Save, Globe, Lock, Eye, Palette, Monitor, ChevronRight, ChevronLeft,
} from 'lucide-react';

const DEFAULT_PREFERENCES = {
  notifications: true,
  privacy: false,
  compactMode: false,
  dataSharing: false,
};

const SAVEABLE_CATEGORIES = new Set(['notifications', 'privacy', 'appearance']);

const CATEGORIES = [
  { id: 'general', label: 'General', icon: Globe, description: 'Language, timezone, and regional preferences' },
  { id: 'profile', label: 'Profile', icon: User, description: 'Email, password, and account details' },
  { id: 'security', label: 'Security', icon: Lock, description: 'Two-factor auth and session management' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'In-platform notification preferences' },
  { id: 'privacy', label: 'Privacy', icon: Eye, description: 'Activity visibility and data sharing' },
  { id: 'appearance', label: 'Appearance', icon: Palette, description: 'Theme and display preferences' },
  { id: 'system', label: 'System', icon: Monitor, description: 'App info, cache, and diagnostics' },
];

const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Settings = () => {
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [cacheLoading, setCacheLoading] = useState(false);
  const [diagnosticsLoading, setDiagnosticsLoading] = useState(false);
  const [diagnosticsResult, setDiagnosticsResult] = useState('');

  useEffect(() => {
    if (user?.preferences) {
      setPreferences({
        ...DEFAULT_PREFERENCES,
        ...user.preferences,
      });
    }
  }, [user]);

  const handleToggle = (key) => setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleCompactToggle = async () => {
    const next = !preferences.compactMode;
    setPreferences((prev) => ({ ...prev, compactMode: next }));
    applyCompactMode(next);

    try {
      const res = await api.put('/users/settings', {
        preferences: { ...preferences, compactMode: next },
      });
      if (res.data.success) {
        updateUser(res.data.data.user);
      }
    } catch {
      setMessage('Error saving compact mode preference.');
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    setMessage('');

    try {
      const res = await api.put('/users/settings', { preferences });
      if (res.data.success) {
        updateUser(res.data.data.user);
        applyCompactMode(res.data.data.user?.preferences?.compactMode);
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch {
      setMessage('Error saving settings');
    }

    setLoading(false);
  };

  const handleChangePassword = async () => {
    setPasswordLoading(true);
    setMessage('');

    try {
      const res = await api.put('/users/password', passwordForm);
      if (res.data.success) {
        setMessage('Password updated successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update password.');
    }

    setPasswordLoading(false);
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    setMessage('');

    try {
      const res = await api.delete('/users/account', {
        data: { confirmation: deleteConfirmation },
      });
      if (res.data.success) {
        logout();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete account.');
      setDeleteLoading(false);
    }
  };

  const handleClearCache = async () => {
    setCacheLoading(true);
    setMessage('');

    try {
      clearAppCache();
      setMessage('Application cache cleared successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      setMessage('Error clearing cache.');
    }

    setCacheLoading(false);
  };

  const handleDiagnostics = async () => {
    setDiagnosticsLoading(true);
    setDiagnosticsResult('');
    setMessage('');

    const results = [];

    try {
      const healthRes = await fetch(getApiUrl('/api/health'));
      const healthData = await healthRes.json();
      if (healthRes.ok && healthData.status === 'OK') {
        results.push('Backend API: operational');
        results.push(`Database: ${healthData.database === 'connected' ? 'connected' : 'unavailable'}`);
      } else {
        results.push('Backend API: unavailable');
      }
    } catch {
      results.push('Backend API: unavailable');
    }

    try {
      const meRes = await api.get('/auth/me');
      if (meRes.data.success) {
        results.push('Authentication: valid');
      } else {
        results.push('Authentication: issue detected');
      }
    } catch {
      results.push('Authentication: issue detected');
    }

    results.push('Frontend: operational');

    const summary = results.every((line) => !line.includes('unavailable') && !line.includes('issue'))
      ? 'System operational'
      : results.find((line) => line.includes('unavailable') || line.includes('issue'))?.replace(/^[^:]+:\s*/, '') || 'Check details below';

    setDiagnosticsResult(`${summary}\n${results.join('\n')}`);
    setDiagnosticsLoading(false);
  };

  const Toggle = ({ active, onClick, labelOn = 'On', labelOff = 'Off', disabled = false }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${active ? 'bg-[#22C55E] text-white' : 'surface-card-inner text-body'} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {active ? labelOn : labelOff}
    </button>
  );

  const SettingRow = ({ title, description, children }) => (
    <div className="flex items-center justify-between py-4 border-b border-[color:var(--color-border-subtle)] last:border-b-0">
      <div>
        <p className="font-medium text-sm text-heading">{title}</p>
        {description && <p className="text-xs mt-0.5 text-caption">{description}</p>}
      </div>
      {children}
    </div>
  );

  const privacyEnabled = isPrivacyModeEnabled({ preferences });

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'general':
        return (
          <>
            <SettingRow title="Language" description="English is currently the only supported language">
              <select className="input-light text-sm py-1.5" disabled defaultValue="english">
                <option value="english">English</option>
              </select>
            </SettingRow>
            <SettingRow title="Time Zone" description={`Detected from your browser: ${browserTimeZone}`}>
              <span className="text-sm text-caption max-w-[10rem] text-right truncate">{browserTimeZone}</span>
            </SettingRow>
          </>
        );

      case 'profile':
        return (
          <>
            <SettingRow
              title="Email Address"
              description={displayEmail(user, privacyEnabled) || 'No email on file'}
            >
              <span className="text-xs text-caption">Verification required (coming soon)</span>
            </SettingRow>
            <SettingRow title="Change Password" description="Update your password">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm((open) => !open);
                  setShowDeleteForm(false);
                }}
                className="text-sm font-medium text-accent hover:opacity-80"
              >
                {showPasswordForm ? 'Cancel' : 'Update'}
              </button>
            </SettingRow>
            {showPasswordForm && (
              <div className="py-4 space-y-3 border-b border-[color:var(--color-border-subtle)]">
                <input
                  type="password"
                  placeholder="Current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="input-light w-full text-sm"
                  autoComplete="current-password"
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="input-light w-full text-sm"
                  autoComplete="new-password"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="input-light w-full text-sm"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="btn-primary w-full py-2.5 text-sm"
                >
                  {passwordLoading ? 'Updating...' : 'Save New Password'}
                </button>
              </div>
            )}
            <SettingRow title="Delete Account" description="Permanently delete your account and data">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteForm((open) => !open);
                  setShowPasswordForm(false);
                }}
                className="text-sm font-medium text-status-danger"
              >
                {showDeleteForm ? 'Cancel' : 'Delete'}
              </button>
            </SettingRow>
            {showDeleteForm && (
              <div className="py-4 space-y-3">
                <p className="text-xs text-caption">
                  This action is permanent. Type <strong>DELETE</strong> to confirm.
                </p>
                <input
                  type="text"
                  placeholder="Type DELETE"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  className="input-light w-full text-sm"
                />
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading || deleteConfirmation !== 'DELETE'}
                  className="btn-secondary w-full py-2.5 text-sm text-status-danger border-status-danger"
                >
                  {deleteLoading ? 'Deleting...' : 'Confirm Account Deletion'}
                </button>
              </div>
            )}
          </>
        );

      case 'security':
        return (
          <>
            <SettingRow title="Two-Factor Authentication" description="Not yet available in this release">
              <span className="text-xs text-caption">Coming soon</span>
            </SettingRow>
            <SettingRow title="Session Management" description="Not available with current sign-in model">
              <span className="text-xs text-caption">Unavailable</span>
            </SettingRow>
          </>
        );

      case 'notifications':
        return (
          <>
            <SettingRow title="In-Platform Notifications" description="Show alerts in the navbar for achievements and progress">
              <Toggle active={preferences.notifications} onClick={() => handleToggle('notifications')} />
            </SettingRow>
            <SettingRow title="Email Notifications" description="Email delivery is not configured in this release">
              <span className="text-xs text-caption">Not configured</span>
            </SettingRow>
            <SettingRow title="Push Notifications" description="Browser push is not configured in this release">
              <span className="text-xs text-caption">Not configured</span>
            </SettingRow>
          </>
        );

      case 'privacy':
        return (
          <>
            <SettingRow title="Privacy Mode" description="Mask your name and email in the navbar and profile">
              <Toggle active={preferences.privacy} onClick={() => handleToggle('privacy')} />
            </SettingRow>
            <SettingRow
              title="Platform Analytics"
              description="Allow optional anonymized usage data to help improve GuardUp (not shared with third parties)"
            >
              <Toggle active={preferences.dataSharing} onClick={() => handleToggle('dataSharing')} />
            </SettingRow>
          </>
        );

      case 'appearance':
        return (
          <>
            <SettingRow title="Theme" description={theme === 'system' ? 'Follow system preference' : `${theme.charAt(0).toUpperCase()}${theme.slice(1)} mode`}>
              <select
                className="input-light text-sm py-1.5 min-w-[8rem]"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </SettingRow>
            <SettingRow title="Compact Mode" description="Reduce spacing in the dashboard">
              <Toggle active={preferences.compactMode} onClick={handleCompactToggle} />
            </SettingRow>
          </>
        );

      case 'system':
        return (
          <>
            <SettingRow title="App Version" description="GuardUp v2.0">
              <span className="text-sm text-caption">2.0.0</span>
            </SettingRow>
            <SettingRow title="Clear Cache" description="Remove locally cached certification and quiz data">
              <button
                type="button"
                onClick={handleClearCache}
                disabled={cacheLoading}
                className="text-sm font-medium text-accent hover:opacity-80"
              >
                {cacheLoading ? 'Clearing...' : 'Clear'}
              </button>
            </SettingRow>
            <SettingRow title="Diagnostics" description="Run a lightweight system health check">
              <button
                type="button"
                onClick={handleDiagnostics}
                disabled={diagnosticsLoading}
                className="text-sm font-medium text-accent hover:opacity-80"
              >
                {diagnosticsLoading ? 'Running...' : 'Run'}
              </button>
            </SettingRow>
            {diagnosticsResult && (
              <div className="mt-4 p-4 rounded-xl surface-card-inner text-sm whitespace-pre-line text-body">
                {diagnosticsResult}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);
  const showSaveButton = SAVEABLE_CATEGORIES.has(activeCategory);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__inner max-w-3xl">
        <div className="dashboard-page__header">
          <h1 className="dashboard-page__title">Settings</h1>
          <p className="dashboard-page__subtitle">Manage your account preferences and security settings</p>
        </div>

        {!activeCategory ? (
          <div className="surface-card overflow-hidden">
            {CATEGORIES.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveCategory(id)}
                className="settings-row w-full flex items-center gap-4 px-5 py-4 text-left border-b border-[color:var(--color-border-subtle)] last:border-b-0"
              >
                <div className="settings-icon-box">
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-heading">{label}</p>
                  <p className="text-xs truncate text-caption">{description}</p>
                </div>
                <ChevronRight size={18} className="text-caption" />
              </button>
            ))}
          </div>
        ) : (
          <div className="surface-card p-6">
            <button
              type="button"
              onClick={() => {
                setActiveCategory(null);
                setMessage('');
                setDiagnosticsResult('');
                setShowPasswordForm(false);
                setShowDeleteForm(false);
              }}
              className="flex items-center gap-1 text-sm link-subtle mb-6"
            >
              <ChevronLeft size={18} />All settings
            </button>

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[color:var(--color-border-subtle)]">
              <div className="settings-icon-box">
                <activeCat.icon size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-heading">{activeCat.label}</h2>
                <p className="text-xs text-caption">{activeCat.description}</p>
              </div>
            </div>

            <div>{renderCategoryContent()}</div>

            {showSaveButton && (
              <button type="button" onClick={saveSettings} disabled={loading} className="btn-primary w-full mt-6 py-3">
                <Save size={18} />{loading ? 'Saving...' : 'Save Settings'}
              </button>
            )}

            {message && (
              <p className={`text-center text-sm mt-3 ${message.includes('Error') || message.includes('Failed') ? 'text-status-danger' : 'text-status-success'}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
