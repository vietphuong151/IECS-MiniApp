const Attendance = require('../models/attendance.model');
const Student = require('../models/student.model');

// Admin/Teacher - Tạo điểm danh
exports.create = async (req, res) => {
  try {
    const { studentId, date, status, note } = req.body;

    if (!studentId || !date || !status) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    const attendance = await Attendance.create({
      studentId,
      date,
      status,
      note,
      createdBy: req.user.id,
    });

    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo điểm danh', error: err.message });
  }
};

// Lấy danh sách điểm danh theo studentId (query param)
exports.getByStudent = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({ message: 'Thiếu studentId' });
    }

    const attendances = await Attendance.findAll({
      where: { studentId },
      order: [['date', 'DESC']],
    });

    res.json(attendances);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách điểm danh', error: err.message });
  }
};

// Lấy danh sách điểm danh theo studentId (path param) - cho Parents API
exports.getByStudentPath = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: 'Thiếu studentId' });
    }

    const attendances = await Attendance.findAll({
      where: { studentId },
      order: [['date', 'DESC']],
    });

    // Tính toán summary
    const summary = {
      total: attendances.length,
      present: attendances.filter(a => a.status === 'present').length,
      late: attendances.filter(a => a.status === 'late').length,
      absent: attendances.filter(a => a.status === 'absent').length,
      excused: attendances.filter(a => a.status === 'excused').length,
    };

    res.json({ attendances, summary });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách điểm danh', error: err.message });
  }
};

// Admin/Teacher - Cập nhật điểm danh
exports.update = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Không tìm thấy điểm danh' });
    }

    const { status, note } = req.body;
    await attendance.update({ status, note });

    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật điểm danh', error: err.message });
  }
};

// Admin/Teacher - Xóa điểm danh
exports.delete = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Không tìm thấy điểm danh' });
    }

    await attendance.destroy();
    res.json({ message: 'Đã xóa điểm danh' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa điểm danh', error: err.message });
  }
};
