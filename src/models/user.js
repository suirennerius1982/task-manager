const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age most be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The mail is not correctly')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toUpperCase().includes('PASSWORD')) {
                throw new Error('The passwor do not should contain the word "passwor", either uppercase or lowercase!!!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }
    ],
    avatar: {
            type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

/* userSchema.methods.getPublicProfile = function() {
    const user = this
    userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
} */

userSchema.methods.toJSON = function() {
        const user = this
        const userObject = user.toObject()
        delete userObject.password
        delete userObject.tokens
        return userObject
}

userSchema.methods.getToken = async function () {
    const user = this
    token = jwt.sign({ _id: user._id.toString() }, 'prueba123', { expiresIn: '10m' })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findUserByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Credentials invalids. User not found,')
    }
    const isValidUser = await bcrypt.compare(password, user.password)
    if (!isValidUser) {
        throw new Error('Credentials invalids.')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function(next) {
    debugger
    const user = this
    const res = await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User