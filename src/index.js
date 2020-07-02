const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const jwt = require('jsonwebtoken')
require('./db/mongoose')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//Example that we are in mtto mode
/* app.use((req, res, next) => {
    res.status(503).send({message: 'In this moment we are in mtto mode!!!'})
}) */

//Example those are something before to call the get method
/* app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('Method GET is not accesible')
    } else {
        next()
    }
}) */

//const bcrypt = require('bcryptjs')


/* const myFuction = async (apsw) => {
    

    const myPsw = 'nerius21!'
    const encryptNerius = await bcrypt.hash(apsw, 8)
    const encryptPsw = await bcrypt.hash(myPsw, 8)
    console.log(myPsw)
    console.log(encryptPsw)
    console.log(encryptNerius)
    const isEqualPsw = await bcrypt.compare(apsw, encryptNerius)
    console.log(isEqualPsw?'true':'false')
} */


//Example about use of token
/* const myFuction = async () => {
    const token = jwt.sign({id: 95519825}, 'prueba123', {expiresIn: '1 hours'})
    console.log(token)

    const data = jwt.verify(token, 'prueba123')
    console.log(data)
}

//myFuction('nerius21!')

myFuction() */

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})

/* const Task = require('./models/task')
const User = require('./models/user')

const main = async () => { */
    //Find the user of the task
    /* const task = await Task.findById('5efe30113cc9632a002ba42c')
    await task.populate('owner').execPopulate()
    console.log(task.owner) */

    //Reverse form: find the tasks of the user
    /* const user = await User.findById('5efe2cc7fa44dd60fa83bbae')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

} */

/* main() */
