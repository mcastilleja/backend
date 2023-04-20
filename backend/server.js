const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandle } = require('./middleware/errorMiddleware')
const cors = require('cors')
const connectDB = require('./config/bd')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/user', require('./routes/usersRoutes'))
app.use(errorHandle)

app.listen(port, ( ) => console.log(`Server start on port ${port}`))