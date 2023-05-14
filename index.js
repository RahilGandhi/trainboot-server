const express = require("express");
const { connection } = require("./database/db");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { router } = require("express");
const employeeRouter = require("./routes/Employee");
const taskRouter = require("./routes/Tasks");
const announcementRouter = require("./routes/Announcements");
const trainingRouter = require("./routes/Training");
const adminRouter = require("./routes/Admin");

const app = express();
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

connection();
// Define routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/employees", employeeRouter);
app.use("/admin", adminRouter);
app.use("/tasks", taskRouter);
app.use("/trainings", trainingRouter);
app.use("/announcements", announcementRouter);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
