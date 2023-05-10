const express = require('express')
const mongoose = require('mongoose')
const Tasks = require('../models/tasks');
const employees = require('../models/employee')
const tasks = require('../models/tasks');
const router = express.Router();

// Tasks Routes 
// Get all tasks
router.get('/all', async (req, res) => {
    const data = await Tasks.find({})
    res.send(data)
})
router.get('/:email', async (req,res) => {
    const data = await Tasks.find({assignedTo: req.params.email})
    res.send(data)
})

// Create Task
router.post('/createTask', async (req, res) => {
    const { description, assignedTo, deadline } = req.body
    const taskData = new Tasks({
        description : description,
        assignedTo : assignedTo,
        deadline : deadline
    })
    await taskData.save()
    res.redirect('/tasks/all')
})

// Employee Completes Task
router.post('/complete', async (req,res) => {
    const id = req.body.id
    const doc = await tasks.findById(id)
    const employee = await employees.findOne({email : doc.assignedTo})
    employee.tasksCompleted = employee.tasksCompleted + 1
    console.log(employee.tasksCompleted)
    doc.completed = true
    await doc.save()
    await employee.save()
    res.json(doc)
})

// Export Module
module.exports = router;