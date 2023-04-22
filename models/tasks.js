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
        required : false
    }   
})

module.exports = mongoose.model('Tasks', taskSchema);

/*
Add employee id field to identify who is the task assigned to.
create a task Id field for quesrying purposes.
*/