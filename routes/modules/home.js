// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()    
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// 搜尋餐廳
router.get('/search', (req, res) => {
  const originalKeyword = req.query.keyword
  const parsedKeyword = req.query.keyword.trim().toLowerCase()
  const userId = req.user._id
  let restaurantList = []
  if (parsedKeyword === '') {
    return res.render('search', { restaurantList, originalKeyword })
  }
  Restaurant.find({
    userId,
    $or: [
      { name: { $regex: parsedKeyword, $options: 'i' }},
      { category: { $regex: parsedKeyword, $options: 'i' }}
    ]
  })
    .lean()
    .then(restaurantList => {
      res.render('search', { restaurant: restaurantList, originalKeyword })
    })
    .catch(error => console.log(error))
})

// 定義分類路由
router.get('/:sort', (req, res) => {
  const sort = req.params.sort
  let sortWay = {}

  switch (sort) {
    case 'asc':
      sortWay.name_en = 'asc'
      break;
    case 'desc':
      sortWay.name_en = 'desc'
      break;
    case 'category':
      sortWay.category = 'asc'
      break;
    case 'location':
      sortWay.location = 'asc'
      break;
  }

  Restaurant.find({ userId })
    .lean()
    .sort(sortWay)
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router