const mongoose = require('mongoose')
const mongoURI ='mongodb://localhost/apiuser'

var connectionDB = mongoose.connect(mongoURI).then(() => {
    console.log('mongoDB connect...')
}).catch((err) => {
    console.log(`Err connect mongodb: ${err}`)
})

module.exports = connectionDB