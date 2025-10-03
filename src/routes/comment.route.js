const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

// Admin/Teacher - Quản lý nhận xét
router.post('/', authenticateToken, authorizeRole('admin'), commentController.create);
router.get('/', authenticateToken, commentController.getByStudent);
router.get('/student/:studentId', authenticateToken, commentController.getByStudentPath);
router.put('/:id', authenticateToken, authorizeRole('admin'), commentController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), commentController.delete);

module.exports = router;
