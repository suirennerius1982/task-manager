const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        send.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/users/:id', async (req, res) => {
    const elementsParam = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const areValidparams = elementsParam.every((element) => allowedUpdate.includes(element))

    if (!areValidparams) {
        return res.status(400).send({ error: 'Invalited updates!!!' })
    }

    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router