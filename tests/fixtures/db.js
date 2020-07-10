const request = require('supertest')
const Task = require('../../src/models/task')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'Digital Build Online',
    email: 'digitalbuildonline@gmail.com',
    password: 'prueba123',
    tokens: [
        {
            token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
        }
    ]
}

const userTwoId = new mongoose.Types.ObjectId()

const userTwo = {
    _id: userTwoId,
    name: 'Nerius Perez',
    email: 'suirennerius1982@gmail.com',
    password: 'prueba123',
    tokens: [
        {
            token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
        }
    ]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Going to the travel',
    completed: true,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Study docker',
    completed: false,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Study nodejs',
    completed: false,
    owner: userTwo._id
}
const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()

    await new User(userOne).save()
    await new User(userTwo).save()

    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree)
}

module.exports = {
    userOne,
    userTwo,
    taskOne,
    setupDatabase
}