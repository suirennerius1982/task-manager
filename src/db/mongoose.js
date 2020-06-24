const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const user = new User({
    name: 'Nerius',
    age: 37
})

user.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})