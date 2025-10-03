const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// Admin/Teacher - Quản lý điểm danh
router.post('/', authenticateToken, authorizeRole('admin'), attendanceController.create);
router.get('/', authenticateToken, attendanceController.getByStudent);
router.get('/student/:studentId', authenticateToken, attendanceController.getByStudentPath);
router.put('/:id', authenticateToken, authorizeRole('admin'), attendanceController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), attendanceController.delete);

module.exports = router;
