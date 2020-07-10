const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOne, userTwo, taskOne, setupDatabase,} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Shuold create task for user', async () => {
    const response = await request(app)
                                .post('/tasks')
                                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                                .send({
                                    description: 'My firts test case to tasks'
                                }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Get all task for user one', async () => {
    const response = await request(app)
                .get('/tasks')
                .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                .send()
                .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should ensure those tasks only are delete for the owner user', async () => {
    await request(app)
                .delete(`/tasks/${taskOne._id}`)
                .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                .send()
                .expect(404)
    const taskOneStillInDatabase = await Task.findById(taskOne._id)
    expect(taskOneStillInDatabase).not.toBeNull()
})
