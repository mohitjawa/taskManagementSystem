const sequelize = require('../config/sequelize');
const TaskModel = require('./task');
// Import other models as needed

// Synchronize all models with the database
async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchronize all defined models with the database
    await sequelize.sync(); // Use { force: true } to drop existing tables if they exist
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { TaskModel, syncModels };
