const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const TestScore = sequelize.define('TestScore', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'student_id',
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'test_name',
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  maxScore: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 10,
    field: 'max_score',
  },
  testDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'test_date',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'created_by',
  },
}, {
  tableName: 'test_scores',
  timestamps: true,
  underscored: true,
});

module.exports = TestScore;
