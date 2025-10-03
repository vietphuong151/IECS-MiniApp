const TestScore = require('../models/testScore.model');
const Student = require('../models/student.model');

// Admin/Teacher - Tạo điểm kiểm tra
exports.create = async (req, res) => {
  try {
    const { studentId, testName, subject, score, maxScore, testDate } = req.body;

    if (!studentId || !testName || score === undefined || !testDate) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }

    const testScore = await TestScore.create({
      studentId,
      testName,
      subject,
      score,
      maxScore: maxScore || 10,
      testDate,
      createdBy: req.user.id,
    });

    res.json(testScore);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi tạo điểm kiểm tra', error: err.message });
  }
};

// Lấy danh sách điểm kiểm tra theo studentId (query param)
exports.getByStudent = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({ message: 'Thiếu studentId' });
    }

    const testScores = await TestScore.findAll({
      where: { studentId },
      order: [['testDate', 'DESC']],
    });

    res.json(testScores);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách điểm kiểm tra', error: err.message });
  }
};

// Lấy danh sách điểm kiểm tra theo studentId (path param) - cho Parents API
exports.getByStudentPath = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: 'Thiếu studentId' });
    }

    const testScores = await TestScore.findAll({
      where: { studentId },
      order: [['testDate', 'DESC']],
    });

    // Tính toán summary
    let summary = {
      total: testScores.length,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
    };

    if (testScores.length > 0) {
      const scores = testScores.map(t => t.score);
      summary.averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      summary.highestScore = Math.max(...scores);
      summary.lowestScore = Math.min(...scores);
    }

    res.json({ testScores, summary });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi lấy danh sách điểm kiểm tra', error: err.message });
  }
};

// Admin/Teacher - Cập nhật điểm kiểm tra
exports.update = async (req, res) => {
  try {
    const testScore = await TestScore.findByPk(req.params.id);
    if (!testScore) {
      return res.status(404).json({ message: 'Không tìm thấy điểm kiểm tra' });
    }

    const { testName, subject, score, maxScore, testDate } = req.body;
    await testScore.update({
      testName,
      subject,
      score,
      maxScore,
      testDate,
    });

    res.json(testScore);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi cập nhật điểm kiểm tra', error: err.message });
  }
};

// Admin/Teacher - Xóa điểm kiểm tra
exports.delete = async (req, res) => {
  try {
    const testScore = await TestScore.findByPk(req.params.id);
    if (!testScore) {
      return res.status(404).json({ message: 'Không tìm thấy điểm kiểm tra' });
    }

    await testScore.destroy();
    res.json({ message: 'Đã xóa điểm kiểm tra' });
  } catch (err) {
    res.status(400).json({ message: 'Lỗi xóa điểm kiểm tra', error: err.message });
  }
};
