const mongoose = require('mongoose')

function connection() {
    const mongoURL = "mongodb+srv://rahil10x:rahil10x@cluster0.umpp81b.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("DB Connected")
})
}


module.exports.connection = connection; 