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

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Develop my first app with nodejs',
    completed: false
})

task.save().then((result) => {
    console.log('Task add')
}).catch((error) => {
    console.log('Error ocurred was saving the task!!!', error)
})
/* const user = new User({
    name: 'Nerius',
    age: 37
})

user.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
}) */