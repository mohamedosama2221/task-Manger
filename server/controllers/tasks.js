const taskModel = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    if (tasks.length === 0) {
      return res.status(200).json({ success: true, msg: "no tasks found" });
    }
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(404).json({ success: false, msg: error });
  }
};

const createTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const task = await taskModel.create({ content: name, complete: completed });
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg:error });
  }
};

const getASingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findOne({ _id: id });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `no task found with an id of :${id}` });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(404).json({ success: false, msg: error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  try {
    await taskModel.updateOne(
      { _id: id },
      { content: name, complete: completed },
      { runValidators: true }
    );
    return res
      .status(200)
      .json({ success: true, data: { req: req.body, id: id } });
  } catch (error) {
    return res.status(404).json({ success: false, msg: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.deleteOne({ _id: id });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, msg: `no task found with an id of :${id}` });
    }

    return res.status(200).json({ success: true, msg: "task deleted" });
  } catch (error) {
    return res.status(404).json({ success: false, msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getASingleTask,
  updateTask,
  deleteTask,
};
