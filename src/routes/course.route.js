const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

router.get('/', courseController.getAll);
router.get('/:id', courseController.getById);
router.post('/', authenticateToken, authorizeRole('admin'), courseController.create);
router.put('/:id', authenticateToken, authorizeRole('admin'), courseController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), courseController.delete);

module.exports = router; 