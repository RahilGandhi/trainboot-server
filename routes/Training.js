const express = require('express')
const mongoose = require('mongoose')
const Trainings = require('../models/training')
const Employees = require('../models/employee')
const router = express.Router();


// Trainings Routes For Employees 
router.get('/all', async (req, res) => {
    const data = await Trainings.find({})
    res.json(data)
})

// Employee Starts training
router.post('/startTraining', async (req, res) => {
    try{
        const userMail = req.body.email
        const trainingInfo = req.body.training_id
        const doc = await Employees.findOne({email:userMail})
        const trainingData = await Trainings.findOne({training_id: trainingInfo})
        const update = {
            training_id : trainingData.training_id,
            name : trainingData.name
        }
        doc.trngsOngoing = doc.trngsOngoing + 1
        doc.ongoingTrainings.push(update)
        await doc.save() 
        res.json(update)  
        
    }
    catch(error){
        console.log(error)
    }
})

// Employee completes training  

module.exports = router