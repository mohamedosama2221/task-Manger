const taskModel = require("../models/Task");

const getAllTasks = (req, res) => {
  console.log("get all the tasks");
  res.status(200).send("submit");
};

const createTask = async (req, res) => {
  const task = await taskModel.create(req.body);
  res.status(200).json({ success: true, data: task });
};

const getASingleTask = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).send("submit");
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  console.log(task, id);
  res.status(200).json({ success: true, data: task });
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).send("submit");
};

module.exports = {
  getAllTasks,
  createTask,
  getASingleTask,
  updateTask,
  deleteTask,
};
