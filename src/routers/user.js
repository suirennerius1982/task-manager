const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, cancelSubcription } = require('../emails/acount')

const router = new express.Router()

const upload = multer({
    //Is not necesary save in local storage because it is saved in data base
    //dest: 'images/avatar/',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        //if (!file.originalname.endsWith('jpg')) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File extensions not permited. Only processing jpgs and pngs file extensions!!!'))
        }
        cb(undefined, true)
    }
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
        res.send({ user })
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.getToken()
        //res.status(201).send({user: user.getPublicProfile(), token})
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password)
        const token = await user.getToken()
        //res.send({user: user.getPublicProfile(), token})
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = new Array()
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: error.message })
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
        res.status(400).send({ error: error.message })
    }
})

router.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    //res.status(400).send({error: error.message})
    if (error instanceof multer.MulterError) {
        return res.status(500).send({ error: error.message })
    } else if (error) {
        return res.status(500).send({ error: error.message })
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        cancelSubcription(req.user.email, req.user.name)
        res.send(req.user)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

router.delete('/user/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

router.get('/user/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error('User or avatar not found')
        }
        //res.set('Content-Type', 'image/jpg')
        res.set('Content-Type', 'png')
        res.send(user.avatar)
    } catch(error) {
        res.status(404).send()
    }
})

module.exports = router