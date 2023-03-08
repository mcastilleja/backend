const getTareas = (req, res) => {
    res.status(200).json({'mensaje':'Mostrar las tareas'})
}

const setTareas = (req, res) => {

    if(!req.body.texto){
        //res.status(400).json({'mensaje':'Favor de incluir una descripción a la tarea'})
        res.status(400)
        throw new Error('Favor de incluir una descripción a la tarea')
    }

    res.status(201).json({'mensaje':'Crear una tarea'})

}

const updateTareas = (req, res) => {
    res.status(200).json({'mensaje':`Modificar una tarea ${req.params.id}`})
}

const deleteTareas = (req, res) => {
    res.status(200).json({'mensaje':`Eliminar una tarea ${req.params.id}`})
}

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}