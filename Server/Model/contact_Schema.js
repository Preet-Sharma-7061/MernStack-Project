const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isResolve: { type: Boolean, default: false }
})

const Contact = new mongoose.model('Contact', ContactSchema)

module.exports = Contact