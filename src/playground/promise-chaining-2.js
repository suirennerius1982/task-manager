require('../db/mongoose')
const Task = require('../models/task')
const { count } = require('../models/task')

/* Task.findByIdAndDelete('5ef3d3b79e5c147c4e2c2eba').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
}) */

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteTaskAndCount('5ef4f5aff30966641e84658f', false).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})