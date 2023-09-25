const { TaskModel } = require("../models/index");
const { Op} = require("sequelize");

exports.createTask = async (req, res) => {
  try {
    const { taskName, discription } = req.body;
    await TaskModel.create({ taskName: taskName, discription: discription });
    return res.status(200).json({
      httpCode: 201,
      code: 201,
      message: "task created sucessfully!",
    });
  } catch (e) {
    return res.status(CodesAndMessages.dbErrCode).json({
      code: 401,
      httpCode: 401,
      message: e.message,
    });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { id, status } = req.body;
    await TaskModel.update(
      { status: status },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json({
      httpCode: 201,
      code: 201,
      message: "task updated sucessfully!",
      data: await TaskModel.findOne({ where: { id: id } }),
    });
  } catch (e) {
    return res.status(CodesAndMessages.dbErrCode).json({
      code: 401,
      httpCode: 401,
      message: e.message,
    });
  }
};
exports.alltasksList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const { count, rows: posts } = await TaskModel.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
      order: [["createdAt", "ASC"]],
    });

    const totalPages = Math.ceil(count / perPage);
    res.status(200).json({
      httpCode: 200,
      code: 200,
      message: "Success",
      data: posts,
      totalDocuments: count,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({
      httpCode: 401,
      code: 401,
      message: e.message,
    });
  }
};
exports.metricsCount = async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(
      year,
      new Date(Date.parse(month + " 1, " + year)).getMonth(),
      1
    );
    const endDate = new Date(
      year,
      new Date(Date.parse(month + " 1, " + year)).getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const formattedStartDate = startDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndDate = endDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log(formattedStartDate, formattedEndDate);
    const tasks = await TaskModel.findAll({
      where: {
        createdAt: {
          [Op.between]: [formattedStartDate, formattedEndDate],
        },
      },
    });

    let openTasksCount = 0;
    let inprogressTasksCount = 0;
    let completedTasksCount = 0;

    for (const task of tasks) {
      switch (task.status) {
        case "open":
          openTasksCount++;
          break;
        case "inprogress":
          inprogressTasksCount++;
          break;
        case "completed":
          completedTasksCount++;
          break;
      }
    }
    const metrics = {
      open_tasks: openTasksCount,
      inprogress_tasks: inprogressTasksCount,
      completed_tasks: completedTasksCount,
    };

    const response = {
      date: `${month} ${year}`,
      metrics: metrics,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
