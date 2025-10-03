const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Staff = sequelize.define('Staff', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'staffs',
  timestamps: false,
});

module.exports = Staff; 