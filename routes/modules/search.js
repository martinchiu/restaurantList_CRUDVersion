// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')

// 搜尋餐廳
router.get('/', (req, res) => {
  const originalKeyword = req.query.keyword
  const parsedKeyword = req.query.keyword.trim().toLowerCase()
  let restaurantList = []
  if (parsedKeyword === '') {
    return res.render('index', { restaurant, originalKeyword })
  }
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      restaurantList = restaurantsData.filter(function searchKeywords(restaurant) {
        return restaurant.name.toLowerCase().includes(parsedKeyword) || restaurant.category.includes(parsedKeyword)
      })

      res.render('index', { restaurant: restaurantList, originalKeyword })
    })
    .catch(error => console.log(error))
})

// 匯出路由模組
module.exports = router