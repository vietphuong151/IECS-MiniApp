require('dotenv').config();
const { sequelize } = require('./config/db');
const Student = require('./src/models/student.model');

async function seedStudents() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Tạo học sinh mẫu
    const sampleStudents = [
      {
        studentCode: 'HS2025001',
        name: 'Nguyễn Văn An',
        dateOfBirth: '2010-05-15',
        gender: 'male',
        phone: '0912345678',
        class: 'BTO1',
        school: 'Bình Thạnh',
      },
      {
        studentCode: 'HS2025002',
        name: 'Trần Thị Bình',
        dateOfBirth: '2011-08-20',
        gender: 'female',
        phone: '0912345679',
        class: 'BTO1',
        school: 'Bình Thạnh',
      },
      {
        studentCode: 'HS2025003',
        name: 'Lê Văn Công',
        dateOfBirth: '2010-12-10',
        gender: 'male',
        phone: '0912345680',
        class: 'BTO2',
        school: 'Quận 1',
      },
    ];

    for (const studentData of sampleStudents) {
      const [student, created] = await Student.findOrCreate({
        where: { studentCode: studentData.studentCode },
        defaults: studentData,
      });

      if (created) {
        console.log(`✅ Created student: ${student.name} (${student.studentCode})`);
      } else {
        console.log(`⚠️  Student already exists: ${student.name} (${student.studentCode})`);
      }
    }

    console.log('\n📊 Current students in database:');
    const allStudents = await Student.findAll();
    console.table(allStudents.map(s => ({
      code: s.studentCode,
      name: s.name,
      class: s.class,
      school: s.school,
      claimed: s.parentId ? 'Yes' : 'No',
    })));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedStudents();
