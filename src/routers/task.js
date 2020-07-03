const expresse = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const User = require('../models/user')

const router = new expresse.Router()

router.get('/tasks', auth, async (req, res) => {
    try {
        debugger
        //const tasks = await Task.find({})
        //const user = await User.findById(req.user._id)
        const match = {}
        if (req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth,async (req, res) => {
    try {
        const id = req.params.id
        //const task = await Task.findById(id)
        const task = await Task.findOne({_id: id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const fieldsTask = Object.keys(req.body)
    const restricts = ['description', 'completed']
    const isValid = fieldsTask.every((element) => restricts.includes(element))
    if (!isValid) {
        return res.status(400).send({error: 'characterict of the task is not valid'})
    }
    try{
        task = await Task.findOne({_id: req.params.id, owner: req.user.id})
        if (!task) {
            return res.status(404).send()
        }
        fieldsTask.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    } catch(error) {
        res.status(400).send({error: error.message})
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user.id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

module.exports = router