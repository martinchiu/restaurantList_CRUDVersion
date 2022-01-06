// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const users = require('./modules/users')
const Oauth = require('./modules/Oauth')

// 引入 middleware
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/Oauth', Oauth)
router.use('/restaurants', authenticator, restaurant)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router
