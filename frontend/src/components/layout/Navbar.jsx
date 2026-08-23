import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Settings, Bell, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Logo from '../common/Logo';
import GuardUpAvatar from '../common/GuardUpAvatar';
import { getUserAvatarId } from '../../utils/avatarStorage';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { displayEmail, displayFullName, isPrivacyModeEnabled } from '../../utils/privacyUtils';
import {
  fetchNotifications,
  fetchUnreadNotificationCount,
  markNotificationRead,
  markAllNotificationsRead,
} from '../../services/notificationsApi';

const POLL_INTERVAL_MS = 45000;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifLoading, setNotifLoading] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const inAppNotificationsEnabled = user?.preferences?.notifications !== false;
  const privacyEnabled = isPrivacyModeEnabled(user);

  const refreshUnreadCount = useCallback(async () => {
    if (!user || !inAppNotificationsEnabled) return;
    try {
      const count = await fetchUnreadNotificationCount();
      setUnreadCount(count);
    } catch {

    }
  }, [user, inAppNotificationsEnabled]);

  const refreshNotifications = useCallback(async () => {
    if (!user || !inAppNotificationsEnabled) return;
    setNotifLoading(true);
    try {
      const [items, count] = await Promise.all([
        fetchNotifications(),
        fetchUnreadNotificationCount(),
      ]);
      setNotifications(items);
      setUnreadCount(count);
    } catch {

    } finally {
      setNotifLoading(false);
    }
  }, [user, inAppNotificationsEnabled]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user || !inAppNotificationsEnabled) {
      setNotifications([]);
      setUnreadCount(0);
      return undefined;
    }

    refreshUnreadCount();
    const intervalId = window.setInterval(refreshUnreadCount, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [user, inAppNotificationsEnabled, refreshUnreadCount]);

  useEffect(() => {
    if (notifOpen && user && inAppNotificationsEnabled) {
      refreshNotifications();
    }
  }, [notifOpen, user, inAppNotificationsEnabled, refreshNotifications]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleNotifications = () => {
    setProfileOpen(false);
    setNotifOpen((open) => !open);
  };

  const toggleProfile = () => {
    setNotifOpen(false);
    setProfileOpen((open) => !open);
  };

  const handleNotificationClick = async (notification) => {
    if (notification.read) return;

    try {
      const updated = await markNotificationRead(notification.id);
      setNotifications((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {

    }
  };

  const handleMarkAllRead = async () => {
    if (!unreadCount) return;

    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
      setUnreadCount(0);
    } catch {

    }
  };

  return (
    <nav className="gu-navbar">
      <div className="gu-navbar__inner">
        <Link to={user ? '/dashboard' : '/'}>
          <Logo size="md" variant="light" />
        </Link>
        {user ? (
          <div className="gu-navbar__actions">
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={toggleNotifications}
                className="gu-navbar__menu-btn relative"
                aria-label="Notifications"
                aria-expanded={notifOpen}
              >
                <Bell size={18} />
                {inAppNotificationsEnabled && unreadCount > 0 && (
                  <span className="gu-navbar__notif-badge" aria-hidden="true">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="gu-navbar__dropdown gu-navbar__dropdown--notifications">
                  <div className="gu-navbar__notif-header">
                    <p className="font-semibold text-sm text-heading">Notifications</p>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="gu-navbar__notif-mark-all"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="gu-navbar__notif-list">
                    {notifLoading && notifications.length === 0 ? (
                      <div className="gu-navbar__notif-empty">Loading notifications...</div>
                    ) : !inAppNotificationsEnabled ? (
                      <div className="gu-navbar__notif-empty">
                        In-platform notifications are disabled in Settings.
                      </div>
                    ) : notifications.length ? (
                      notifications.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => handleNotificationClick(notification)}
                          className={`gu-navbar__notif-item${notification.read ? '' : ' gu-navbar__notif-item--unread'}`}
                        >
                          <div className="gu-navbar__notif-item-main">
                            <p className="gu-navbar__notif-title">{notification.title}</p>
                            <p className="gu-navbar__notif-message">{notification.message}</p>
                          </div>
                          <span className="gu-navbar__notif-time">
                            {formatRelativeTime(notification.createdAt)}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="gu-navbar__notif-empty">No notifications yet</div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={toggleProfile}
                className="gu-navbar__menu-btn"
                aria-expanded={profileOpen}
              >
                <GuardUpAvatar avatarId={getUserAvatarId(user.id)} size={28} />
                <span className="hidden sm:inline">{displayFullName(user, privacyEnabled).split(' ')[0]}</span>
                <ChevronDown size={14} className="text-caption" />
              </button>
              {profileOpen && (
                <div className="gu-navbar__dropdown">
                  <div className="px-4 py-2 border-b border-[color:var(--color-border-subtle)]">
                    <p className="font-medium text-sm text-heading">{displayFullName(user, privacyEnabled)}</p>
                    <p className="text-xs text-caption">{displayEmail(user, privacyEnabled)}</p>
                  </div>
                  <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="gu-navbar__dropdown-item">
                    <User size={16} />Profile
                  </Link>
                  <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="gu-navbar__dropdown-item">
                    <Settings size={16} />Settings
                  </Link>
                  <button type="button" onClick={handleLogout} className="gu-navbar__dropdown-item w-full text-left text-status-danger">
                    <LogOut size={16} />Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="gu-navbar__actions">
            <Link to="/login" className="gu-navbar__link">Login</Link>
            <Link to="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
