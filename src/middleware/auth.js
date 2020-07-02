const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        token = req.headers.authorization.replace('Bearer ', '')
        const decode = jwt.verify(token, 'prueba123')
        const idParam = req.params.id
        const idToken = decode._id
        if (idParam !== idToken) {
            throw new Error('User id for this transacction is not valid!!!')
        }
        const user = await User.findOne({_id: decode._id, 'tokens.token': token})
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