const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

require('./db/mongoose')

const User = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

const myFuction = async () => {
    const token = jwt.sign({id: 95519825}, 'prueba123', {expiresIn: '1 hours'})
    console.log(token)

    const data = jwt.verify(token, 'prueba123')
    console.log(data)
}

//myFuction('nerius21!')

myFuction()

app.listen(port, () => {
    console.log(`Server is up on port: ${port}`)
})