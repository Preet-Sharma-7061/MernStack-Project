require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const Db = require('./utils/db')
const AuthRouter = require('./Router/auth_router')
const ContactRouter = require('./Router/contact_router')
const errormiddleware = require('./Error_Middleware/error_middleware')

app.use(express.json())

app.use('/api/app/auth', AuthRouter)
app.use('/api/app/contact', ContactRouter)

app.use(errormiddleware)

app.listen(PORT, () => {
    console.log(`server running on : http://localhost:${PORT}`);
})
