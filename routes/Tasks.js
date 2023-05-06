const express = require('express')
const mongoose = require('mongoose')
const Tasks = require('../models/tasks');
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
    const { description, assignedTo, deadline, completed } = req.body
    const taskData = new Tasks({
        description : description,
        assignedTo : assignedTo,
        deadline : deadline,
        completed : completed
    })
    await taskData.save()
    res.redirect('/tasks/all')
})

// Employee Completes Task
router.post('/complete', async (req,res) => {
    const id = req.body.id
    const doc = await tasks.findById(id)
    doc.completed = true
    await doc.save()
    res.json(doc)
})

// Export Module
module.exports = router;