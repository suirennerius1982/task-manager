const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        /* if (idParam !== idToken) {
            throw new Error('User id for this transacction is not valid!!!')
        } */
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if (!user) {
            throw new Error('This user not exist')
        }
        req.token = token
        req.user = user
        next()
    } catch (error){
        res.status(401).send({error: `Invalid token!!!' ${error.message}`})
    }    
}

module.exports = auth