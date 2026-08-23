import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import Badge, { normalizeBadge } from '../../components/common/Badge';
import GuardUpAvatar from '../../components/common/GuardUpAvatar';
import AvatarPickerModal from '../../components/common/AvatarPickerModal';
import { getUserAvatarId, setUserAvatarId } from '../../utils/avatarStorage';
import { displayEmail, isPrivacyModeEnabled, maskName } from '../../utils/privacyUtils';
import {
  Mail,
  Award,
  Shield,
  Calendar,
  Clock,
  Medal,
  TrendingUp,
  Camera,
  Pencil,
  Save,
  X,
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [avatarId, setAvatarId] = useState(() => getUserAvatarId(user?.id));
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const privacyEnabled = isPrivacyModeEnabled(user);
  const badges = user.badges || [];

  const handleAvatarSave = (id) => {
    setAvatarId(id);
    setUserAvatarId(user.id, id);
  };

  const startEditing = () => {
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setMessage('');
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setFirstName('');
    setLastName('');
    setMessage('');
    setIsEditing(false);
  };

  const saveProfile = async () => {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();

    if (trimmedFirst.length < 2) {
      setMessage('First name must be at least 2 characters.');
      return;
    }

    if (trimmedLast.length < 2) {
      setMessage('Last name must be at least 2 characters.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const res = await api.put('/users/profile', {
        firstName: trimmedFirst,
        lastName: trimmedLast,
      });

      if (res.data.success) {
        updateUser(res.data.data.user);
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const statRows = [
    { label: 'Member Since', value: new Date(user.createdAt).toLocaleDateString() },
    { label: 'Total Simulations', value: user.totalSimulations || 0 },
    { label: 'Total XP', value: user.xp || 0 },
    { label: 'Badges Earned', value: badges.length },
    { label: 'Current Streak', value: `${user.streak || 0} simulations` },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__inner max-w-5xl">
        <div className="dashboard-page__header">
          <h1 className="dashboard-page__title">Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 surface-card p-6">
            <div className="flex items-start gap-6 mb-6">
              <button
                type="button"
                onClick={() => setAvatarModalOpen(true)}
                className="gu-profile-avatar-btn flex-shrink-0"
                aria-label="Change avatar"
              >
                <GuardUpAvatar avatarId={avatarId} size={88} className="rounded-full overflow-hidden" />
                <span className="gu-profile-avatar-btn__camera">
                  <Camera size={16} />
                </span>
              </button>

              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="profile-first-name" className="block text-xs font-medium text-caption mb-1.5">
                          First name
                        </label>
                        <input
                          id="profile-first-name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="input-light w-full"
                          placeholder="First name"
                          disabled={saving}
                        />
                      </div>
                      <div>
                        <label htmlFor="profile-last-name" className="block text-xs font-medium text-caption mb-1.5">
                          Last name
                        </label>
                        <input
                          id="profile-last-name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="input-light w-full"
                          placeholder="Last name"
                          disabled={saving}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={saveProfile}
                        disabled={saving}
                        className="btn-primary inline-flex items-center gap-2 py-2 px-4"
                      >
                        <Save size={16} />
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        disabled={saving}
                        className="btn-secondary inline-flex items-center gap-2 py-2 px-4"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-2xl font-bold text-heading">
                          {privacyEnabled
                            ? `${maskName(user.firstName)} ${maskName(user.lastName)}`
                            : `${user.firstName} ${user.lastName}`}
                        </h2>
                        <p className="text-sm mt-1 text-body">{user.role}</p>
                      </div>
                      <button
                        type="button"
                        onClick={startEditing}
                        className="btn-secondary inline-flex items-center gap-2 py-2 px-4 shrink-0"
                      >
                        <Pencil size={16} />
                        Edit Profile
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {message && (
              <p
                className={`text-sm mb-4 ${
                  message.includes('successfully') ? 'text-status-success' : 'text-status-danger'
                }`}
              >
                {message}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm text-body">
                <Mail size={18} className="text-caption" />
                <span>{displayEmail(user, privacyEnabled)}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-body">
                <Shield size={18} className="text-accent" />
                <span>Skill Level: {user.skillLevel?.replace('_', ' ') || 'Not Assigned'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-body">
                <Award size={18} className="text-[#EAB308]" />
                <span>XP: {user.xp} | Level: {user.level}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-body">
                <Clock size={18} className="text-status-success" />
                <span>Streak: {user.streak || 0} simulations</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-body">
                <Calendar size={18} className="text-caption" />
                <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-body">
                <TrendingUp size={18} className="text-caption" />
                <span>Simulations: {user.totalSimulations || 0}</span>
              </div>
            </div>
          </div>

          <div className="surface-card p-6 h-fit">
            <h3 className="font-semibold text-heading mb-4">Account Stats</h3>
            <div className="space-y-3">
              {statRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-body">{label}</span>
                  <span className="font-medium text-heading">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="surface-card p-6">
          <h3 className="font-semibold text-heading mb-4 flex items-center gap-2">
            <Medal size={18} className="text-[#EAB308]" />
            Badge Collection
          </h3>
          {badges.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {badges.map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <Badge badge={normalizeBadge(b)} size="md" />
                  <span className="text-xs leading-tight text-caption">{b.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-body">No badges yet. Complete simulations to earn them!</p>
          )}
        </div>
      </div>

      <AvatarPickerModal
        open={avatarModalOpen}
        currentId={avatarId}
        onClose={() => setAvatarModalOpen(false)}
        onSave={handleAvatarSave}
      />
    </div>
  );
};

export default Profile;
