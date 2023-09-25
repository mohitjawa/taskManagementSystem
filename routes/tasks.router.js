const express = require("express");
const router = express.Router();
const taskCtrl=require('../controller/tasks.controller')

router.post(
    "/create-task",
    taskCtrl.createTask
  );
router.put(
    "/update-task",
    taskCtrl.updateTask
  );
  router.get(
    "/all-tasks",
    taskCtrl.alltasksList
  );
  router.get(
    "/count-tasks",
    taskCtrl.metricsCount
  );

module.exports=router