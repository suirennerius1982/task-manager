require('../db/mongoose')
const User = require('../models/user')

User.findByIdAndUpdate('5ef4a074b5ef757d6717a1da', {age: 36}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 36})
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})