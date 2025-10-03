const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false,
    defaultValue: 'user',
  },
  zaloId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: 'zalo_id',
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'display_name',
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locale: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastSeenAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_seen_at',
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

module.exports = User;
