const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const { userOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should singup new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Metamorfosis Wow',
        email: 'metamorfosiswow@gmail.com',
        password: 'prueba123'
    }).expect(201)

    //Assert that the data base was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull() 

    //Asserting about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Metamorfosis Wow',
            email: 'metamorfosiswow@gmail.com'
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

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/mw.png')
        .expect(200)
    const user = await User.findById(userOne._id)
    expect(user.avatar).toEqual(expect.any(Buffer))
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

test('Should update valid user fields', async () => {
    const response = await request(app)
                .patch('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send( {
                    name: 'Juanito'
                }).expect(200)
    const user = await User.findById(userOne._id)
    expect('Juanito').toBe(user.name)
    expect(response.body).toMatchObject({name: 'Juanito'})
})

test('Should not update invalid user fields', async () => {
    await request(app)
                .patch('/users/me')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send({
                    location: 'Puerto Rico'
                }).expect(400)
})