const express = require('express')
require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)    
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(500).send(error)
    }

   /*  task = new Task(req.body)
    task.save().then((result) => {
        res.status(201).send(result)
    }).catch((reject) => {
        res.status(400).send(reject);
    }) */
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error){
        send.status(500).send(error)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        } 
        
        res.status(200).send(user)    
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error){
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})