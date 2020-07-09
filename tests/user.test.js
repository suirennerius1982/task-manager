const request = require('supertest')
const app = require('../src/app')
const user = require('../src/models/user')
const User = require('../src/models/user')

const userOne = {
    name: 'Digital Build Online',
    email: 'digitalbuildonline@gmail.com',
    password: 'prueba123'
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