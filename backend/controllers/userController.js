const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const loginUser = asyncHandler( async (req, res) => {

    const { email, password } = req.body // Desestructuramos la información del body

    // Se revisa que existan los campos
    if( !email || !password) {

        res.status(400)
        throw new Error('Son necesarios todos los datos')

    }
    
    const user = await User.findOne({email}) // Verificamos si el usuario existe

    // Se compara el usuario y se HASHEA la contraseña
    if(user && (await bcrypt.compare(password, user.password))){

        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })

    } else {

        res.status(400)
        throw new Error('Credenciales Incorrectas')

    }

})

const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password } = req.body // Desestructuración del body request

    // Verificamos que toda la información exista
    if( !name || !email || !password) {
        res.status(400)
        throw new Error('Son necesarios todos los datos')
    }

    const userExist = await User.findOne({email}) // Verificamos si el usuario existe en la colección

    // Si el usuario existe enviar un error
    if(userExist) {
        res.status(400)
        throw new Error('Ese email ya ha sido registrado anteriormente')
    }

    // HASH al password
    // 1 Creando la SAL
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user  = await User.create({
        name,
        email,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Los datos son incorrectos el usuario no pudo ser creado')
    }

})

const getMisDatos = asyncHandler( async (req, res) => {
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}

module.exports = {
    loginUser,
    registerUser,
    getMisDatos
}