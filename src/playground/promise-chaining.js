require('../db/mongoose')
const User = require('../models/user')

/* User.findByIdAndUpdate('5ef4a074b5ef757d6717a1da', {age: 36}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 36})
}).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
}) */

const updateAgeAndCount = async (_id, age) => {
    const user = await User.findByIdAndUpdate(_id, { age })
    console.log(user)
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5ef49ebbf335ca77204b1272', 65).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})