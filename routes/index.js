// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)
// 引入 restaurant 模組程式碼
const restaurant = require('./modules/restaurant')
// 將網址結構符合 /restaurant 字串開頭的 request 導向 restaurant 模組
router.use('/restaurants', restaurant)
// 引入 search 模組程式碼
const search = require('./modules/search')
// 將網址結構符合 /search 字串的 request 導向 home 模組 
router.use('/search', search)

// 匯出路由器
module.exports = router