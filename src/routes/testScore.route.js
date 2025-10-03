const express = require('express');
const router = express.Router();
const testScoreController = require('../controllers/testScore.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// Admin/Teacher - Quản lý điểm kiểm tra
router.post('/', authenticateToken, authorizeRole('admin'), testScoreController.create);
router.get('/', authenticateToken, testScoreController.getByStudent);
router.get('/student/:studentId', authenticateToken, testScoreController.getByStudentPath);
router.put('/:id', authenticateToken, authorizeRole('admin'), testScoreController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), testScoreController.delete);

module.exports = router;
