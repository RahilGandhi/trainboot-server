const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    assignedTo : {
        type : String,
        required : true
    },
    deadline : {
        type : String,
        required : false
    },
    completed : {
        type : Boolean,
        required : false,
        default : false
    }   
})

module.exports = mongoose.model('Tasks', taskSchema);

