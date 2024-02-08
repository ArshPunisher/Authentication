const jwt = require('jsonwebtoken')
const secret = "@r$#2R@mG@r#"

function createToken(user){
    const payload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, secret)
    return token
}

function verifyToken(token){
    const payload = jwt.verify(token, secret)
    return payload;
}

module.exports = {createToken, verifyToken}