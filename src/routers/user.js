const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

const router = new express.Router()

const upload = multer({
    dest: 'images/avatar/'
})

router.get('/users/me', auth, async (req, res) => {
    //res.send({user: req.user.getPublicProfile()})
    res.send(req.user)
})

router.get('/users/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        //res.status(200).send({user: user.getPublicProfile()})
        res.send({user})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.getToken()
        //res.status(201).send({user: user.getPublicProfile(), token})
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password)
        const token = await user.getToken()
        //res.send({user: user.getPublicProfile(), token})
        res.send({user, token})
    } catch(error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        debugger
        console.log('here')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        console.log(req.user.tokens)
        await req.user.save()
        res.send()
    } catch(error) {
        res.status(500).send({error: error.message})
    }
    
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = new Array()
        await req.user.save()
        res.send(req.user)
    } catch(error) {
        console.log(error.message)
        res.status(500).send({error: error.message})
    }
})

router.patch('/users/me', auth, async (req, res) => {
    debugger
    const elementsParam = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const areValidparams = elementsParam.every((element) => allowedUpdate.includes(element))

    if (!areValidparams) {
        return res.status(400).send({ error: 'Invalited updates!!!' })
    }

    try {
        elementsParam.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        //res.send({user: userUpdate.getPublicProfile()})
        res.send(req.user)
    } catch (error) {
        console.log('here' + error)
        res.status(400).send({error: error.message})
    }
})

router.post('/user/me/avatar', upload.single('avatar'), (req, res) => {
    try {
        res.send()
    } catch (error){
        res.status(500).send({error: error.message})
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        debugger
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})




module.exports = router