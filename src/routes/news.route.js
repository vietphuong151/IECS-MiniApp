const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { authenticateToken, authorizeRole } = require('../middlewares/auth.middleware');

router.get('/', newsController.getAll);
router.get('/:slug', newsController.getBySlug);
router.post('/', authenticateToken, authorizeRole('admin'), newsController.create);
router.put('/:id', authenticateToken, authorizeRole('admin'), newsController.update);
router.delete('/:id', authenticateToken, authorizeRole('admin'), newsController.delete);

module.exports = router;
