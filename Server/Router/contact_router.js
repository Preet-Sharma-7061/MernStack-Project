const express = require('express')
const router = express.Router()
const Query = require('../Controller/contact_controller')
const { JwtMiddleware } = require('../JwtAuth/auth')

router.route('/save').post(JwtMiddleware , Query.saveQuery)
router.route('/get-contect').get(JwtMiddleware, Query.getQuery)

module.exports = router
