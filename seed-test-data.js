require('dotenv').config();
const { sequelize } = require('./config/db');
const Student = require('./src/models/student.model');
const Attendance = require('./src/models/attendance.model');
const TestScore = require('./src/models/testScore.model');
const Comment = require('./src/models/comment.model');

async function seedTestData() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Lấy học sinh đầu tiên
    const student = await Student.findOne({ where: { studentCode: 'HS2025001' } });
    
    if (!student) {
      console.log('❌ Không tìm thấy học sinh HS2025001. Hãy chạy seed-students.js trước!');
      process.exit(1);
    }

    console.log(`📚 Tạo dữ liệu test cho học sinh: ${student.name} (ID: ${student.id})`);

    // Tạo điểm danh mẫu
    const attendanceSamples = [
      { date: '2025-01-20', status: 'present', note: null },
      { date: '2025-01-21', status: 'present', note: null },
      { date: '2025-01-22', status: 'late', note: 'Đi học trễ 10 phút' },
      { date: '2025-01-23', status: 'absent', note: 'Nghỉ ốm' },
      { date: '2025-01-24', status: 'present', note: null },
    ];

    for (const data of attendanceSamples) {
      await Attendance.findOrCreate({
        where: { studentId: student.id, date: data.date },
        defaults: { ...data, studentId: student.id, createdBy: 1 },
      });
    }
    console.log('✅ Đã tạo điểm danh mẫu');

    // Tạo điểm kiểm tra mẫu
    const testScoreSamples = [
      { testName: 'Kiểm tra giữa kỳ', subject: 'Tiếng Đức A1', score: 8.5, maxScore: 10, testDate: '2025-01-15' },
      { testName: 'Bài tập lớn', subject: 'Tiếng Đức A1', score: 9.0, maxScore: 10, testDate: '2025-01-20' },
      { testName: 'Kiểm tra cuối kỳ', subject: 'Tiếng Đức A1', score: 7.5, maxScore: 10, testDate: '2025-01-25' },
    ];

    for (const data of testScoreSamples) {
      await TestScore.findOrCreate({
        where: { studentId: student.id, testName: data.testName, testDate: data.testDate },
        defaults: { ...data, studentId: student.id, createdBy: 1 },
      });
    }
    console.log('✅ Đã tạo điểm kiểm tra mẫu');

    // Tạo nhận xét mẫu
    const commentSamples = [
      { content: 'Em học rất chăm chỉ và có tiến bộ rõ rệt', commentType: 'general', testScoreId: null },
      { content: 'Cần ôn lại phần ngữ pháp', commentType: 'general', testScoreId: null },
      { content: 'Bài kiểm tra làm tốt, phát âm chuẩn', commentType: 'test_related', testScoreId: null },
    ];

    for (const data of commentSamples) {
      await Comment.create({ ...data, studentId: student.id, createdBy: 1 });
    }
    console.log('✅ Đã tạo nhận xét mẫu');

    console.log('\n✨ Hoàn tất! Có thể test các API sau:');
    console.log(`GET /api/attendances/student/${student.id}`);
    console.log(`GET /api/test-scores/student/${student.id}`);
    console.log(`GET /api/comments/student/${student.id}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedTestData();
