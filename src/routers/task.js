const expresse = require('express')
const Task = require('../models/task')

const router = new expresse.Router()

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const fieldsTask = Object.keys(req.body)
    const restricts = ['description', 'completed']
    const isValid = fieldsTask.every((element) => restricts.includes(element))
    if (!isValid) {
        return res.status(400).send({error: 'characterict of the task is not valid'})
    }
    try{
        const task = await Task.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router