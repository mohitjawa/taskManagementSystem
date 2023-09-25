const express = require('express');
const { TaskModel, syncModels } = require('./models');
const taskRouter=require('./routes/tasks.router')
require('dotenv').config()

const app = express();
app.use(express.json())
app.use('/',taskRouter)

// ... (other setup code)

// Call the sync function to create tables for all defined models
syncModels()
  .then(() => {
    console.log('Models synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error during initialization:', error);
  });

  app.listen(process.env.PORT,()=>console.log('server is running at 3000'))
