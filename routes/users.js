const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const { createToken } = require('../service/authentication')

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/signup', (req, res)=>{
    res.render('signup')
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try {
        const token = await userModel.matchPassword(email, password)
        res.cookie('token', token)
        res.redirect('/')
    } catch (error) {
        return res.status(400).json({error: error.message})
    }  
})

router.post('/signup', async (req, res)=>{
    const {fullname , email, password} = req.body;
    const user = await userModel.create({
        fullname, 
        email, 
        password
    })
    console.log(user)
    const token = createToken(user)
    res.cookie('token', token)
    res.redirect('/')
})

module.exports = router;