const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default:0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age most be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('The mail is not correctly')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim:true,
        minlength: 6,
        validate(value) {
            if(value.toUpperCase().includes('PASSWORD')) {
                throw new Error('The passwor do not should contain the word "passwor", either uppercase or lowercase!!!')
            }
        }
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        console.log('User saving or updating...')
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('executing save pree' + user.name)

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User