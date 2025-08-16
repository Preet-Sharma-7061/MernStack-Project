const User = require('../Model/auth_Schema')
const bcrypt = require('bcrypt')
const { generateToken } = require('../JwtAuth/auth')
const { Uservalidation, loginvalidation } = require('../ZOD/zod_validation')

const Userlogin = async (req, res, next) => {
    try {
        const { email, password } = loginvalidation.parse(req.query)
        const userInfo = await User.findOne({ email })

        if (!userInfo) {
            return res.status(401).json({ message: 'Invalid Email' })
        }

        const isPasswordMatch = await bcrypt.compare(password, userInfo.password)

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid Password!' })
        }
        const token = generateToken({ id: userInfo._id, username: userInfo.username, isAdmin: userInfo.isAdmin })
        res.status(200).json({ message: 'Login successfully!', Token: token })
    } catch (error) {
        const status = 400
        const extraDetails = error.issues[0].message
        const Error = { status, extraDetails }
        next(Error)
    }
}

const UserSignup = async (req, res, next) => {
    try {
        const UserInfo = Uservalidation.parse(req.body)
        const existingEmail = await User.findOne({ email: UserInfo.email })
        if (existingEmail) {
            return res.status(401).json({ message: "Email Already Exits!" })
        }
        const newUser = new User(UserInfo)
        const response = await newUser.save()
        const token = generateToken({ id: response._id, username: response.username, isAdmin: response.isAdmin })
        res.status(200).json({ message: 'SignUp Successfully!', Token: token })
    } catch (error) {
        const status = 400
        const extraDetails = error.issues[0].message
        const Error = { status, extraDetails }
        next(Error)
    }
}

const UserDashboard = (req, res) => {
    const UserProfile = req.user
    res.status(200).json({ message: 'Welcome To User-Dashboard!', Profile: UserProfile })
}

module.exports = { Userlogin, UserSignup, UserDashboard }