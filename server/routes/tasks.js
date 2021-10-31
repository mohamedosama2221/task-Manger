const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  postATask,
  getASingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.get("/", getAllTasks);

router.post("/", postATask);

router.get("/:id", getASingleTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
