const Course = require('../models/course.model');

exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo khóa học', error: err.message });
  }
};

exports.getAll = async (req, res) => {
  console.log(req.body);
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách', error: err.message });
  }
};

exports.getById = async (req, res) => {
  console.log(req.body);
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi', error: err.message });
  }
};

exports.update = async (req, res) => {
  console.log(req.body);
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Không tìm thấy' });
    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật', error: err.message });
  }
};

exports.delete = async (req, res) => {
  console.log(req.body);
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ message: 'Không tìm thấy' });
    await course.destroy();
    res.json({ message: 'Đã xóa' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa', error: err.message });
  }
}; 