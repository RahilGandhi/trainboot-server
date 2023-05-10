const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    date: {
        type: String,
        required: true
    },
    time : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Announcements', announcementSchema);