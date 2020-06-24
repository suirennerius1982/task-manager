const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const urlToConect = 'mongodb://localhost:27017'
const dataBase = 'task-manager' 

MongoClient.connect(urlToConect, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('It not posible conect to data base!!!')
    }

    console.log('Conected sucessful!!!')
    const db = client.db('task-manager')
    /* db.collection('users').insertOne({
        name: 'Nerius',
        age: 27
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
        console.log('User add!!!')
    }) */
    /* db.collection('users').insertMany([
        {
            name: 'Ruben',
            age: 70
        },
        {
            name: 'Juana',
            age: 65
        }
    ], (error, result) => {
        if (error) {
            return console.log('Is not posible add are elements to db!!!')
        }

        console.log(result.ops)
    }) */

    db.collection('tasks').insertMany([
        {
            description: 'Learning nodejs',
            completed: false
        },
        {
            description: 'Learn java8 lambdas',
            completed: false
        },
        {
            description: 'Learn java8 strems',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('It not posible inserts are elements to data base')
        }

        console.log(result.ops)
    })
    console.log('adding...')
})