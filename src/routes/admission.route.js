const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admission.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

router.get('/', admissionController.getAll);
router.get('/:id', admissionController.getById);
router.post('/', authenticateToken, authorizeRole('admin'), admissionController.create);
router.put('/:id', authenticateToken, authorizeRole('admin'), admissionController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), admissionController.delete);

module.exports = router; 