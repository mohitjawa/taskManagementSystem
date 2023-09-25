const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize('your_database_name', 'root', 'your_database_password', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

