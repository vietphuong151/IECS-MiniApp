const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Đồng bộ thông tin người dùng từ Mini App
router.post('/sync', userController.syncProfile);

// Lấy thông tin bằng zaloId
router.get('/zalo/:zaloId', userController.getByZaloId);

// Lấy thông tin bằng id nội bộ
router.get('/:id', userController.getById);

module.exports = router;
