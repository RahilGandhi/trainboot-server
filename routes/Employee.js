const express = require('express')
const mongoose = require('mongoose')
const Employees = require('../models/employee')
const router = express.Router();


// Employee Routes
router.get('/allEmployees', async (req, res) => {
    try{
        const employeeData = await Employees.find({})
        res.send(employeeData)
    }
    catch(err){
        console.log(err)
    }
})
router.get('/allEmployees/:id', async (req, res) => {
    try{
        const id = req.params.id
        const employeeData = await Employees.findById(id)
        res.send(employeeData)
    }
    catch(err){
        console.log(err)
    }
})
router.post('/addEmployee', async (req, res) => {
    try{
        const {firstName, lastName, email, empId, deptId, deptName} = req.body
        const employeeData = new Employees({
            firstName : firstName,
            lastName : lastName,
            email : email,
            empId : empId,
            deptId : deptId,
            deptName : deptName
        })
        await employeeData.save()
        res.send("Employee Added Successfully")
    }   
    catch(err) {
        console.log(err)
    }
})

// Export module router
module.exports = router