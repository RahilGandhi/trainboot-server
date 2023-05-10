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
router.get('/:id', async (req,res) => {
    const data = await Trainings.findOne({_id : req.params.id})
    res.json(data)
})

// Create Training
router.post('/createTraining', async (req, res) => {
    try{
        const {name, instructor, src, summary, thumbnail } = req.body
        const trainingData = new Trainings({
            name : name,
            instructor : instructor,
            src : src,
            summary : summary,
            thumbnail : thumbnail
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
        const trainingInfo = req.body.id
        const doc = await Employees.findOne({email:userMail})
        const trainingData = await Trainings.findOne({_id: trainingInfo});
        let alreadyExists = false;
        doc.ongoingTrainings.forEach((trainings) => {
            if(trainings._id == trainingInfo){
                alreadyExists = true;
                return res.json({message : 'already exists'})
            }
        });
        if(!alreadyExists){
        const update = {
            _id : trainingData.id,
            name : trainingData.name
        }
        doc.trngsOngoing = doc.trngsOngoing + 1
        doc.ongoingTrainings.push(update)
        console.log(doc)
        await doc.save() 
        res.json(doc.ongoingTrainings)  }
        
    }
    catch(error){
        console.log(error)
    }
})

// Employee completes training  
router.post('/finishTraining', async (req,res) => {
    try{
        const userMail = req.body.email
        const trainingInfo = req.body.id
        const doc = await Employees.findOne({email: userMail})
        const trainingData = await Trainings.findOne({_id: trainingInfo})
        let alreadyExists = false;
        doc.completedTrainings.forEach((trainings) => {
            if(trainings._id == trainingInfo){
                alreadyExists = true;
                return res.json({message : 'already exists'})
            }
        });
        if(!alreadyExists){
            const update = {
                _id: trainingData.id,
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
        
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router