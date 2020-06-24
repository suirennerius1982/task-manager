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

   /*  db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if (error) {
            return console.log('Error to connect to data base!!!') 
        }
        console.log(tasks)
    })

    db.collection('tasks').count({completed: true}, (error, count) => {
        if (error) {
            return console.log('Error to connect to data base!!!') 
        }
        console.log(count)
    })

    db.collection('tasks').findOne( {_id: new mongodb.ObjectID('5ef2642797264f203480690b')}, (error, task) => {
        if (error) {
            return console.log('Data base its not accesible!!!')
        }

        console.log(task)
    }) */

    console.log('updating user!!!')

    db.collection('users').updateOne({
            _id: new mongodb.ObjectID("5ef252e733efa67eeacbd86d")
        }, {
            $set: {
                name: 'Nerius Perez'
            },
            $inc: {
                age: 1
            }
        }).then((result) => {
            console.log('user updated!!!')
        }).catch((error) => {
            console.log(error)
        })

        db.collection('tasks').updateMany({
            completed: false
        }, {
            $set: {
                completed: true
            }
        }).then((result) => {
            if (result)
            console.log('All tasks in state incomplete were update to state completed: Count elements updates: ' + result.modifiedCount)
        }).catch((reject) => {
            console.log(reject)
        })
    /* db.collection('users').findOne({name: 'Ruben'}, (error, user) => {
        if (error) {
            return console.log('Data base not accesible!!!')
        }
        console.log(user)
    }) */

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

   /*  db.collection('tasks').insertMany([
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
    }) */
    console.log('Executing...')
})