const notificationService = require('../services/notificationService');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user.id);

    res.status(200).json({
      success: true,
      data: { notifications },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUnreadCount = async (req, res, next) => {
  try {
    const unreadCount = await notificationService.getUnreadCount(req.user.id);

    res.status(200).json({
      success: true,
      data: { unreadCount },
    });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markNotificationAsRead(
      req.user.id,
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: { notification },
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  try {
    const updatedCount = await notificationService.markAllNotificationsAsRead(req.user.id);

    res.status(200).json({
      success: true,
      data: { updatedCount },
    });
  } catch (error) {
    next(error);
  }
};
