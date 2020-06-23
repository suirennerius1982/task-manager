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
    db.collection('users').insertOne({
        name: 'Nerius',
        age: 27
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
        console.log('User add!!!')
    })
    console.log('User  is adding...')
})