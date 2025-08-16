const Contact = require('../Model/contact_Schema')

const saveQuery = async (req, res, next) => {
    try {
        const ContactInfo = req.body
        const newcontactinfo = new Contact(ContactInfo)
        const response = await newcontactinfo.save()
        res.status(200).json({ message: "Successfully Submitted!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getQuery = async (req, res, next) => {
    try {
        const isAdmin = req.user.isAdmin
        if (!isAdmin) {
            return res.status(404).json({ message: "Only Admin See Query" })
        }
        const response = await Contact.find()
        res.status(200).json({ message: response })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { saveQuery, getQuery }