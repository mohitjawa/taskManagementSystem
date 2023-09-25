const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Task = sequelize.define('tasks', {
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'inprogress', 'completed'),
    defaultValue: 'open',
  }
},{timestamps:true});

module.exports = Task;
