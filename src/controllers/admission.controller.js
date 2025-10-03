const Admission = require('../models/admission.model');

exports.create = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.json(admission);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo tuyển sinh', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const admissions = await Admission.findAll();
    res.json(admissions);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(admission);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Không tìm thấy' });
    await admission.update(req.body);
    res.json(admission);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) return res.status(404).json({ message: 'Không tìm thấy' });
    await admission.destroy();
    res.json({ message: 'Đã xóa' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa', error: err.message });
  }
}; 