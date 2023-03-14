const express = require('express')
const router = express.Router()
const { registerUser } = require('../controllers/userController')

router.post('/', registerUser)
//router.route('/').get(registerUser).post(setUser)
//router.route('/:id').put(updateUser).delete(deleteUser)

module.exports = router