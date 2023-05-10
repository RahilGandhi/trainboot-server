const express = require('express')
const router = express.Router();

const Announcements = require('../models/announcement')

router.get('/all', async (req,res) => {
    const data = await Announcements.find({})
    res.send(data)
})

router.post('/create', async (req,res) => {
    const {title, date, time } = req.body
    const announcement = new Announcements({
        title : title,
        date : date,
        time : time
    })
    await announcement.save()
    res.json({"message" : "Announcement Created Successfully"}).status(200)
})

module.exports = router