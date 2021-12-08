// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')
const sort =
  // 定義首頁路由
  router.get('/', (req, res) => {
    Restaurant.find()
      .lean()
      .then(restaurant => res.render('index', { restaurant }))
      .catch(error => console.log(error))
  })

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