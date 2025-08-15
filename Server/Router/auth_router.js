const express = require('express')
const router = express.Router()
const authentication = require('../Controller/auth_controller')
const { JwtMiddleware, Logout } = require('../JwtAuth/auth')

router.route('/signup').post(authentication.UserSignup)
router.route('/login').get(authentication.Userlogin)
router.route('/logout').post(Logout)
router.route('/dashboard').get(JwtMiddleware , authentication.UserDashboard)


module.exports = router