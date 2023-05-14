const Task = require("../models/taskTable");
const asyncWrapper = require("../middleware/async-wrapper");

const getAllTasks = asyncWrapper(async (req, resp) => {
  try {
    const tasks = await Task.find({});
    resp.status(200).json({ tasks });
  } catch (error) {
    resp.status(500).json({ msg: err });
  }
});

const getTask = asyncWrapper(async (req, resp) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await Task.findOne({ _id: taskID });
    if (!tasks) {
      resp.status(404).json({ msg: `Task not found for Id ${taskID}` });
    }

    resp.status(200).json({ tasks });
  } catch (error) {
    resp.status(500).json({ error });
  }
});

const createTask = asyncWrapper(async (req, resp) => {
  try {
    const tasks = await Task.create(req.body);
    resp.status(200).json({ tasks });
  } catch (error) {
    resp.status(500).json({ msg: error });
  }
});

const updateTask = asyncWrapper(async (req, resp) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tasks) {
      resp.status(404).json({ msg: `Task not found for Id ${taskID}` });
    }
    resp.status(200).json({ tasks });
  } catch (error) {
    resp.status(500).json({ error });
  }
});

const deleteTask = asyncWrapper(async (req, resp) => {
  try {
    const { id: taskID } = req.params;
    const tasks = await Task.findOneAndDelete({ _id: taskID });
    if (!tasks) {
      resp.status(404).json({ msg: `Task not found for Id ${taskID}` });
    }
    resp.status(200).json({ tasks });
  } catch (error) {
    resp.status(500).json({ error });
  }
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
