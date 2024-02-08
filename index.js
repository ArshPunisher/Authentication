const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {checkAuth} = require('./middlewares/checkAuth')

const staticRoute = require('./routes/staticRoute')
const users = require('./routes/users')

mongoose.connect("mongodb://127.0.0.1:27017/authentication")

app.set("view engine", "ejs")

app.use(cookieParser())
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(checkAuth('token'))

app.use('/', staticRoute)
app.use('/users', users);



app.listen(PORT, ()=>{
    console.log(`I'm listening on PORT: ${PORT}`)
})