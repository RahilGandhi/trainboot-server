const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    age : {
        type : String,
        required : false
    },
    empId : {
        type : String,
        required : true
    },
    deptId : {
        type : String,
        required : true
    },
    deptName : {
        type: String,
        required : true
    },
    trngsCmpltd : {
        type : Number,
        required : false
    },
    completedTrainings : {
        type : Array,
        required : false
    }
    
})

module.exports = mongoose.model('Employees', employeeSchema);