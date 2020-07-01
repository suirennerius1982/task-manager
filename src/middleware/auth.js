const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        token = req.headers.authorization.replace('Bearer ', '')
        const decode = jwt.verify(token, 'prueba123')
        const user = await User.findOne({_id: decode._id, 'tokens.token': token})
        if (!user) {
            throw new Error()
        }
        req.user = user
    next()
    } catch (error){
        res.status(401).send({error: "Invalid token!!!"})
    }    
}

module.exports = auth