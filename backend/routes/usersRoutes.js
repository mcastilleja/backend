const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMisDatos } = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/misdatos', getMisDatos)

module.exports = router