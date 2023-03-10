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

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    const tareaModificada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true} )

    res.status(200).json(tareaModificada)
})

const deleteTareas = asyncHandler( async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }
    
    // await tarea.remove

    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json(tareaEliminada)
})

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}