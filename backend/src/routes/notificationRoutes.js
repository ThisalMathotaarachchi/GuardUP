const express = require('express');
const auth = require('../middleware/auth');
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} = require('../controllers/notificationController');

const router = express.Router();

router.get('/', auth, getNotifications);
router.get('/unread-count', auth, getUnreadCount);
router.put('/read-all', auth, markAllAsRead);
router.put('/:id/read', auth, markAsRead);

module.exports = router;
