const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandle } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use(errorHandle)

app.listen(port, ( ) => console.log(`Server start on port ${port}`))