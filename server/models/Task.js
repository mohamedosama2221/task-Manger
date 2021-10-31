const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "must provide a content"],
    trim: true,
    maxlength: [25, "cant be more than 25 characters"],
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
