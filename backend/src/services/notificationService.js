const prisma = require('../lib/prisma');

const NOTIFICATION_LIMIT = 50;

const toApiNotification = (notification) => ({
  id: notification.id,
  type: notification.type,
  title: notification.title,
  message: notification.message,
  read: notification.read,
  createdAt: notification.createdAt.toISOString(),
});

const createNotification = async (userId, type, title, message) => {
  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
    },
  });

  return toApiNotification(notification);
};

const getUserNotifications = async (userId) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: NOTIFICATION_LIMIT,
  });

  return notifications.map(toApiNotification);
};

const getUnreadCount = async (userId) =>
  prisma.notification.count({
    where: { userId, read: false },
  });

const markNotificationAsRead = async (userId, notificationId) => {
  const existing = await prisma.notification.findFirst({
    where: { id: notificationId, userId },
  });

  if (!existing) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }

  if (existing.read) {
    return toApiNotification(existing);
  }

  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });

  return toApiNotification(updated);
};

const markAllNotificationsAsRead = async (userId) => {
  const result = await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });

  return result.count;
};

module.exports = {
  createNotification,
  getUserNotifications,
  getUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
