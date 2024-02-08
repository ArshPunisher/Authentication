const { verifyToken } = require("../service/authentication");

function checkAuth(cookieName){
    return(req, res, next)=>{
        const tokenCookie = req.cookies[cookieName]
        if(!tokenCookie) return next();
        try {
            const user = verifyToken(tokenCookie)
            req.user = user
        } catch (error) {}
        return next();
    }
}

async function checkLogin(req, res, next){
    const tokenCookie = req.cookies?.token
    if(!tokenCookie) return res.redirect('/users/login')
    try {
        verifyToken(tokenCookie)
    } catch (error) {
        return res.redirect('/users/signup')
    }
    return next();
}

module.exports = {checkAuth, checkLogin}