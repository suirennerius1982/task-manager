const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
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

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required:true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
})

const task = new Task({
    description: ' Learn Enlish  ',
    completed: true
})

task.save().then((result) => {
    console.log('Task add')
}).catch((error) => {
    console.log('Error ocurred was saving the task!!!', error)
})
/* const user = new User({
    age: 37,
    name: '   Hacker   ',
    email: 'Suirennerius1982@gmAil.com',
    password: '   sdfgfPASsWOr   ggggf '
})

user.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
}) */

/* const user2 = new User({
    name: '   sUIREN   ',
    email: 'Suirennerius1982@YAHOO.com   ',
    password: 'localpasswordhots'
})

user2.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
}) */