import api from './api';

export const fetchNotifications = async () => {
  const response = await api.get('/notifications');
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load notifications');
  }
  return response.data.data.notifications ?? [];
};

export const fetchUnreadNotificationCount = async () => {
  const response = await api.get('/notifications/unread-count');
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to load unread count');
  }
  return response.data.data.unreadCount ?? 0;
};

export const markNotificationRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to mark notification as read');
  }
  return response.data.data.notification;
};

export const markAllNotificationsRead = async () => {
  const response = await api.put('/notifications/read-all');
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to mark notifications as read');
  }
  return response.data.data.updatedCount ?? 0;
};
