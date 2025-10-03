const Staff = require('../models/staff.model');

exports.create = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.json({ id: staff.id, image: staff.image, position: staff.position });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo nhân sự', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const staffs = await Staff.findAll({ attributes: ['id', 'image', 'position'] });
    res.json(staffs);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id, { attributes: ['id', 'image', 'position'] });
    if (!staff) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi', error: err.message });
  }
};

exports.getByPosition = async (req, res) => {
  try {
    const staffs = await Staff.findAll({ where: { position: req.params.position }, attributes: ['id', 'image', 'position'] });
    res.json(staffs);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Không tìm thấy' });
    await staff.update(req.body);
    res.json({ id: staff.id, image: staff.image, position: staff.position });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Không tìm thấy' });
    await staff.destroy();
    res.json({ message: 'Đã xóa' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa', error: err.message });
  }
}; 