const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    texto : {
        type : String,
        required : [ true, 'Es necesario ingresar una tarea']
    }
},{
    timestamps : true
})

module.exports = mongoose.model('Tarea', tareaSchema)