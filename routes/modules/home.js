// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')

// 定義首頁路由
router.get('/', (req, res) => {
  // model.find() 在未傳入參數時，會回傳整份資料
  Restaurant.find()
  // 把從 model 取來的特殊物件（含有原型鍊(prototype chain)及繼承了其他操作方法的，複雜的物件）透過lean() 方法轉換成單純的資料物件
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
  Restaurant.find({
    $or: [
      { name: { $regex: parsedKeyword, $options: 'i' }},
      { category: { $regex: parsedKeyword, $options: 'i' }}
    ]
  })
    .lean()
    .then(restaurantList => {
      res.render('index', { restaurant: restaurantList, originalKeyword })
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

  Restaurant.find()
    .lean()
    .sort(sortWay)
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router