const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
    timezone: "+07:00", 
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
      useUTC: false, // không convert UTC khi trả dữ liệu
    },
  }
);

module.exports = { sequelize };
