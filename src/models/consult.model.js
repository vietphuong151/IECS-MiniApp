const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Consult = sequelize.define('Consult', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  consultation_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'done', 'cancelled'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'consults',
  timestamps: true,
});

module.exports = Consult;
