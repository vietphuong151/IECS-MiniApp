const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const sanitizeUser = (userInstance) => {
  if (!userInstance) return null;
  const user = userInstance.toJSON();
  delete user.password;
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    zaloId: user.zaloId,
    displayName: user.displayName,
    avatar: user.avatar,
    email: user.email,
    phone: user.phone,
    locale: user.locale,
    lastSeenAt: user.lastSeenAt,
    metadata: user.metadata,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

exports.syncProfile = async (req, res) => {
  try {
    const {
      zaloId,
      id,
      name,
      displayName,
      avatar,
      email,
      phone,
      locale,
      metadata,
    } = req.body;

    const normalizedZaloId = zaloId || id;

    if (!normalizedZaloId) {
      return res.status(400).json({ message: 'Thiếu zaloId hoặc id người dùng' });
    }

    const payload = {
      zaloId: normalizedZaloId,
      displayName: displayName || name || null,
      avatar: avatar || null,
      email: email || null,
      phone: phone || null,
      locale: locale || null,
      metadata: metadata || null,
      lastSeenAt: new Date(),
    };

    const [user, created] = await User.findOrCreate({
      where: { zaloId: normalizedZaloId },
      defaults: { ...payload, role: 'user' },
    });

    if (!created) {
      await user.update(payload);
    }

    await user.reload();

    // Tạo JWT token
    const token = jwt.sign(
      {
        id: user.id,
        zaloId: user.zaloId,
        role: user.role,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({ 
      user: sanitizeUser(user), 
      created,
      token 
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Không thể lưu thông tin người dùng',
      error: error.message,
    });
  }
};

exports.getByZaloId = async (req, res) => {
  try {
    const { zaloId } = req.params;

    const user = await User.findOne({ where: { zaloId } });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    return res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({
      message: 'Không thể lấy thông tin người dùng',
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    return res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return res.status(500).json({
      message: 'Không thể lấy thông tin người dùng',
      error: error.message,
    });
  }
};
