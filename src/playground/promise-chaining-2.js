require('../db/mongoose')
const Task = require('../models/task')

Task.findByIdAndDelete('5ef3d3b79e5c147c4e2c2eba').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})