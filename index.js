const express = require('express')
const { connection } = require('./database/db')
const mongoose = require ('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const { router } = require('express')
const employeeRouter = require('./routes/Employee')
const taskRouter = require('./routes/Tasks')
const app = express();

// Middleware to parse JSON body
app.use(express.json());
connection()

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use('/employees', employeeRouter)
app.use('/tasks', taskRouter)
// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});