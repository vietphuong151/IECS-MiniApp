const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// Admin - Quản lý học sinh
router.post('/admin', authenticateToken, authorizeRole('admin'), studentController.createStudent);
router.get('/admin', authenticateToken, authorizeRole('admin'), studentController.getAllStudents);
router.put('/admin/:id', authenticateToken, authorizeRole('admin'), studentController.updateStudent);
router.delete('/admin/:id', authenticateToken, authorizeRole('admin'), studentController.deleteStudent);

// Parent - Claim và xem học sinh
router.post('/claim', authenticateToken, studentController.claimStudent);
router.get('/', authenticateToken, studentController.getMyStudents);
router.get('/:id', authenticateToken, studentController.getStudentById);

module.exports = router;
