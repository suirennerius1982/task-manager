const request = require('supertest')
const app = require('../src/app')
const user = require('../src/models/user')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should sinup new user', async () => {
    await request(app).post('/users').send({
        name: 'Nerius',
        email: 'suirennerius1982@gmail.com',
        password: 'prueba123'
    }).expect(201)
})

test('Should login to app', async () => {
    await request(app).post('/users/login').send({
        name: userOne.name,
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Should logout the user', async () => {
    await request(app).post('/users/logout').send({
        email: 'testloginfail@gmail.com',
        password: 'prueba123'
    }).expect(401)
})

test('Should login sussefull', async () => {
    await request(app)
                .post('/users/login')
                .set('Authorization', userOne.tokens[0])
                .send({
                    email: userOne.email,
                    password: userOne.password
                })
                .expect(200)
})

test('Should not login because header token is not provider', async () => {
    await request(app)
                .get('/users/me')
                .send({
                    email: userOne.email,
                    password: userOne.password
                })
                .expect(401)
})

test('Should delete acount of user', async () => {
    //console.log(userOne.tokens[0])
    await request(app)
                .delete('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)
})

test('Should not delete acount for unauthenticated user', async () => {
    await request(app)
                .delete('/users/me')
                .send()
                .expect(401)
})