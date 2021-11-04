const taskModel = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    if (tasks.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: true, msg: "no tasks found" });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: tasks });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: error });
  }
};

const createTask = async (req, res) => {
  const { name, completed } = req.body;
  try {
    const task = await taskModel.create({ content: name, complete: completed });
    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, msg: "Task name can't be empty" });
    }
    return res.status(StatusCodes.CREATED).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: error });
  }
};

const getASingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await taskModel.findOne({ _id: id });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, msg: `no task found with an id of :${id}` });
    }

    return res.status(StatusCodes.OK).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: error });
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
    if (!name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, msg: "Task name can't be empty" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: { req: req.body, id: id } });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.deleteOne({ _id: id });

    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, msg: `no task found with an id of :${id}` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, msg: "task deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getASingleTask,
  updateTask,
  deleteTask,
};
