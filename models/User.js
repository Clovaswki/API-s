const mongoose = require('mongoose')
const Schema = mongoose.Schema

var User = Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    foto:{
        type: String,
        required: true
    }
})

var UserModel = mongoose.model('usersApi', User)

module.exports = UserModel