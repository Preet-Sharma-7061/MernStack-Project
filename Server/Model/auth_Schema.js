const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// create the User Info Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// hash the user Password before save in database
UserSchema.pre('save', async function (next) {
    const User = this
    if (!User.isModified) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        User.password = await bcrypt.hash(User.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

const User = new mongoose.model('User', UserSchema)

module.exports = User