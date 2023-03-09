const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler( async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas)
})

const setTareas = asyncHandler( async (req, res) => {

    if(!req.body.texto){
        //res.status(400).json({'mensaje':'Favor de incluir una descripción a la tarea'})
        res.status(400)
        throw new Error('Favor de incluir una descripción a la tarea')
    }

    const tareas = await Tarea.create({
        texto : req.body.texto
    })

    res.status(201).json(tareas)

})

const updateTareas = asyncHandler( async (req, res) => {
    res.status(200).json({'mensaje':`Modificar una tarea ${req.params.id}`})
})

const deleteTareas = asyncHandler( async (req, res) => {
    res.status(200).json({'mensaje':`Eliminar una tarea ${req.params.id}`})
})

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}