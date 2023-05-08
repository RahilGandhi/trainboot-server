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

// Get one trainings
router.get('/:training_id', async (req,res) => {
    const data = await Trainings.findOne({training_id : req.params.training_id})
    res.json(data)
})
// Create Training
router.post('/createTraining', async (req, res) => {
    try{
        const {name, instructor, training_id, src, summary } = req.body
        const trainingData = new Trainings({
            name : name,
            instructor : instructor,
            training_id : training_id,
            src : src,
            summary : summary
        })
        await trainingData.save()
        res.json(trainingData)
    }
    catch(error){
        console.log(error)
    }
   
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
        console.log(doc)
        await doc.save() 
        res.json(update)  
        
    }
    catch(error){
        console.log(error)
    }
})

// Employee completes training  
router.post('/finishTraining', async (req,res) => {
    try{
        const userMail = req.body.email
        const trainingInfo = req.body.training_id
        const doc = await Employees.findOne({email: userMail})
        const trainingData = await Trainings.findOne({training_id: trainingInfo})
        const update = {
            training_id: trainingData.training_id,
            name : trainingData.name,
            completed : true,
        }
        doc.ongoingTrainings.pop()
        doc.completedTrainings.push(update)
        doc.trngsOngoing = doc.trngsOngoing - 1
        doc.trngsCompleted = doc.trngsCompleted + 1
        await doc.save()
        res.json(update)
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router