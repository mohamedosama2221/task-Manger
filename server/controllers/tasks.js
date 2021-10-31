const getAllTasks = (req, res) => {
  console.log("get all the tasks");
  res.status(200).send("submit");
};

const postATask = (req, res) => {
  const { task } = req.body;
  console.log(task);
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
  postATask,
  getASingleTask,
  updateTask,
  deleteTask,
};
