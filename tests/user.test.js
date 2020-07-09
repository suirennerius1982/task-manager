const request = require('supertest')
const app = require('../src/app')

test('Should sinup new user', async () => {
    await request(app).post('/users').send({
        name: 'Nerius',
        email: 'suirennerius1982@gmail.com',
        password: 'prueba123'
    }).expect(201)
})