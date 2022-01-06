// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require('../../models/Restaurant')

// 新增餐廳
router.get('/new', (req, res) => {
  res.render('addRestaurant')
})

router.post('/add', (req, res) => {
  const newRestaurant = req.body
  newRestaurant.userId = req.user._id
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const showId = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ showId, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳資料
router.get('/:id/edit', (req, res) => {
  if (!req.params.id) return // 檢查前端帶入是否為空值

  const _id = req.params.id
  const userId = req.user._id
  // 透過 id 找到要編輯的資料
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => { res.render('edit', { restaurant }) })
    .catch(err => console.log(err))
})
// 編輯完成後，透過 findByIdAndUpdate() 更新資料
router.put('/:id', (req, res) => {
  if (!req.body) return

  const _id = req.params.id
  const userId = req.user._id
  const editedRestaurant = req.body
  Restaurant.findOneAndUpdate({ _id, userId }, editedRestaurant)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
