const express = require('express');
const { checkLogin } = require('../middlewares/checkAuth');
const router = express.Router()

router.get('/', checkLogin , (req, res)=>{
    res.render('home', {
        user: req.user
    })
})

module.exports = router;