// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const originalKeyword = req.query.keyword
  const parsedKeyword = req.query.keyword.trim().toLowerCase()
  let restaurantList = []
  if (parsedKeyword === '') {
    return res.render('index', { restaurantList, originalKeyword })
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

// 定義分類路由
router.get('/:sort', (req, res) => {
  const sort = req.params.sort
  let sortWay = ''

  switch (sort) {
    case 'asc':
      sortWay = 'name_en'
      break;
    case 'desc':
      sortWay = '-name_en'
      break;
    case 'category':
      sortWay = 'category'
      break;
    case 'region':
      sortWay = 'region'
      break;
  }

  Restaurant.find()
    .lean()
    .sort(sortWay)
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router