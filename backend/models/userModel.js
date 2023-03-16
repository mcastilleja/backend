const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : [true, 'Por favor escribe un nombre']
    },
    email : {
        type : String,
        require : [true, 'Por favor ingresa un correo valido'],
        unique : true
    },
    password : {
        type : String,
        require : [true, 'Por favor ingresa un password']
    }
},{
    timestamps : true
})

module.exports = mongoose.model('User', userSchema)