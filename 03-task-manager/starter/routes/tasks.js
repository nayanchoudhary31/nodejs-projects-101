const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require("../controllers/tasks");

// app.get("/api/v1/tasks") - get all tasks
// app.get("/api/v1/tasks/:id") - get a single tasks
// app.post("/api/v1/tasks") - create new task
// app.patch("/api/v1/tasks/:id") - edit an existing task
// app.delete("/api/v1/tasks/:id") - delete an task

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
