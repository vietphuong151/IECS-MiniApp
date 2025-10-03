const express = require('express');
const router = express.Router();
const consultController = require('../controllers/consult.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// User gửi đăng ký tư vấn
router.post('/', consultController.create);
// Admin xem danh sách
router.get('/', authenticateToken, authorizeRole('admin'), consultController.getAll);
// Admin cập nhật trạng thái
router.put('/:id/status', authenticateToken, authorizeRole('admin'), consultController.updateStatus);
// Lấy danh sách ngày đã đặt lịch
router.get('/booked-dates', consultController.getBookedDates);

module.exports = router;
