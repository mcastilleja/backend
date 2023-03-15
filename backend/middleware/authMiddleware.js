const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asyncHandler( async( req, res, next ) => {
    
    let token

    if(req.headers.autorization && req.headers.autorization.startsWith('Bearer')){
        try {
            // Obteniendo el token del encabezado
            token = req.headers.authorization.split(' ')[1]
            // Verificar la firma del token
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            // Obteniendo el usuario del token
            req.user = await User.findById(decode.id).select('-password')

            next() // Continua con la ejecución del programa

        } catch (error) {

            console.log(error)
            res.status(401)
            throw new Error('ACCESO NO AUTORIZADO')
            
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se recibió ningún token')
    }

})

module.exports = {
    protect
}