const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Comment = sequelize.define('Comment', {
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  commentType: {
    type: DataTypes.ENUM('general', 'test_related'),
    allowNull: false,
    defaultValue: 'general',
    field: 'comment_type',
  },
  testScoreId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'test_score_id',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'created_by',
  },
}, {
  tableName: 'comments',
  timestamps: true,
  underscored: true,
});

module.exports = Comment;
