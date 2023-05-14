const connectDB = require("./db/connect");
const express = require("express");
const task = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const app = express();
require("dotenv").config();

const PORT = 3000;

//middleware

app.use(express.json());
app.use(express.static("./public"));

// routes
// app.get("/api/v1/tasks") - get all tasks
// app.get("/api/v1/tasks/:id") - get a single tasks
// app.post("/api/v1/tasks") - create new task
// app.patch("/api/v1/tasks/:id") - edit an existing task
// app.delete("/api/v1/tasks/:id") - delete an task

app.use("/api/v1/tasks", task);

app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
