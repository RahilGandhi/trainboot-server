const express = require('express')
const router = express.Router();
const Trainings = require('../models/training')
const Employees = require('../models/employee')
const Announcements = require('../models/announcement')


router.get('/init', async (req,res) => {
    const Employee = await Employees.find({})
    const Announcement = await Announcements.find({})
    let ongoingCount = 0
    let completedCount = 0
    Employee.forEach((employee) => {
        ongoingCount = ongoingCount + employee.trngsOngoing
        completedCount = completedCount + employee.trngsCompleted
    })
    const data = {
        totalEmployees : Employee.length,
        ongoingTrainings : ongoingCount,
        completedTrainings : completedCount,
        announcemnts :   Announcement.length
    }
    res.json(data)
})

module.exports = router