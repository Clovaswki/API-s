const express = require('express')
const app = express()
const connectionMongo = require('./database/db')
const routes = require('./routes')
const cors = require('cors')

//body parser: json
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//routes
app.use(cors({
    origin: '*'
}))
app.use('/', routes)

//server listening on the port default of PC
var PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})