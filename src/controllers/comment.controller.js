const Comment = require('../models/comment.model');
const Student = require('../models/student.model');
const TestScore = require('../models/testScore.model');

// Admin/Teacher - Tạo nhận xét
exports.create = async (req, res) => {
  try {
    const { studentId, content, commentType, testScoreId } = req.body;

    if (!studentId || !content) {
      return res.status(400).json({ message: 'Thiếu studentId hoặc content' });
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    if (testScoreId) {
      const testScore = await TestScore.findByPk(testScoreId);
      if (!testScore) {
        return res.status(404).json({ message: 'Không tìm thấy điểm kiểm tra' });
      }
    }

    const comment = await Comment.create({
      studentId,
      content,
      commentType: commentType || 'general',
      testScoreId,
      createdBy: req.user.id,
    });

    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo nhận xét', error: err.message });
  }
};

// Lấy danh sách nhận xét theo studentId (query param)
exports.getByStudent = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({ message: 'Thiếu studentId' });
    }

    const comments = await Comment.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']],
    });

    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách nhận xét', error: err.message });
  }
};

// Lấy danh sách nhận xét theo studentId (path param) - cho Parents API
exports.getByStudentPath = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: 'Thiếu studentId' });
    }

    const comments = await Comment.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']],
    });

    res.json({ comments });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách nhận xét', error: err.message });
  }
};

// Admin/Teacher - Cập nhật nhận xét
exports.update = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Không tìm thấy nhận xét' });
    }

    const { content, commentType, testScoreId } = req.body;
    await comment.update({
      content,
      commentType,
      testScoreId,
    });

    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật nhận xét', error: err.message });
  }
};

// Admin/Teacher - Xóa nhận xét
exports.delete = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Không tìm thấy nhận xét' });
    }

    await comment.destroy();
    res.json({ message: 'Đã xóa nhận xét' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa nhận xét', error: err.message });
  }
};
