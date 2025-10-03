const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

router.get('/', staffController.getAll);
router.get('/:id', staffController.getById);
router.get('/position/:position', staffController.getByPosition);
router.post('/', authenticateToken, authorizeRole('admin'), staffController.create);
router.put('/:id', authenticateToken, authorizeRole('admin'), staffController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), staffController.delete);

module.exports = router; 