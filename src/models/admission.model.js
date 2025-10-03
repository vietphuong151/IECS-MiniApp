const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Admission = sequelize.define('Admission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'admissions',
  timestamps: false,
});

module.exports = Admission; 