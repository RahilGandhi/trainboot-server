const mongoose = require('mongoose')

const trainingSchema = mongoose.Schema({
    training_id : {
        type: String,
        required : false
    },
    name : {
        type : String,
        required : true
    },
    summary : {
        type : String,
        required: true
    },
    instructor : {
        type : String,
        required : true
    },
    duration : {
        type: String,
        required : false,
    },
    thumbnail : {
        type : String,
        required : false
    },
    src : {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('Trainings', trainingSchema);