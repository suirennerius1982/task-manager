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

test('Should singup new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Perez',
        email: 'suirennerius1982@gmail.com',
        password: 'prueba123'
    }).expect(201)

    //Assert that the data base was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull() 

    //Asserting about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Perez',
            email: 'suirennerius1982@gmail.com'
        },
        token: user.tokens[0].token
    })

    //Check thst the password dosent in plain text
    expect(user.password).not.toBe('prueba123')
})

test('Should login to app', async () => {
    const response = await request(app)
                            .post('/users/login')
                            .send({
                                name: userOne.name,
                                email: userOne.email,
                                password: userOne.password
                            })
                            .expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body).toMatchObject(
                { 
                    user:{
                        name: user.name,
                        email: user.email
                    },
                    token: user.tokens[1].token
                }
    )
    //expect(response.body.token).toBe(user.tokens[1].token) 


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
    await request(app)
                .delete('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)
    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

test('Should not delete acount for unauthenticated user', async () => {
    const response = await request(app)
                .delete('/users/me')
                .send()
                .expect(401)
})