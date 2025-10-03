const Student = require('../models/student.model');

// Admin - Tạo học sinh mới
exports.createStudent = async (req, res) => {
  try {
    const { studentCode, name, dateOfBirth, gender, phone, class: className, school, metadata } = req.body;

    if (!studentCode || !name) {
      return res.status(400).json({ message: 'Thiếu studentCode hoặc name' });
    }

    const existingStudent = await Student.findOne({ where: { studentCode } });
    if (existingStudent) {
      return res.status(400).json({ message: 'Mã học sinh đã tồn tại' });
    }

    const student = await Student.create({
      studentCode,
      name,
      dateOfBirth,
      gender,
      phone,
      class: className,
      school,
      metadata,
    });

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo học sinh', error: err.message });
  }
};

// Admin - Lấy tất cả học sinh
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách học sinh', error: err.message });
  }
};

// Admin - Cập nhật học sinh
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    const { name, dateOfBirth, gender, phone, class: className, school, metadata } = req.body;
    await student.update({
      name,
      dateOfBirth,
      gender,
      phone,
      class: className,
      school,
      metadata,
    });

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật học sinh', error: err.message });
  }
};

// Admin - Xóa học sinh
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    await student.destroy();
    res.json({ message: 'Đã xóa học sinh' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa học sinh', error: err.message });
  }
};

// Parent - Claim học sinh bằng studentCode
exports.claimStudent = async (req, res) => {
  try {
    const { studentCode } = req.body;
    const parentId = req.user.id;

    if (!studentCode) {
      return res.status(400).json({ message: 'Thiếu studentCode' });
    }

    const student = await Student.findOne({ where: { studentCode } });
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh với mã này' });
    }

    if (student.parentId) {
      return res.status(400).json({ message: 'Học sinh đã được claim bởi phụ huynh khác' });
    }

    await student.update({
      parentId,
      claimedAt: new Date(),
    });

    res.json({ message: 'Claim học sinh thành công', student });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi claim học sinh', error: err.message });
  }
};

// Parent - Lấy danh sách con đã claim
exports.getMyStudents = async (req, res) => {
  try {
    const parentId = req.user.id;
    const students = await Student.findAll({ where: { parentId } });
    res.json(students);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách học sinh', error: err.message });
  }
};

// Parent - Xem chi tiết con
exports.getStudentById = async (req, res) => {
  try {
    const parentId = req.user.id;
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    if (student.parentId !== parentId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền xem học sinh này' });
    }

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy thông tin học sinh', error: err.message });
  }
};
