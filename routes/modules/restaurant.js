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
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const showId = req.params.id
  return Restaurant.findById(showId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳資料
router.get('/:id/edit', (req, res) => {
  if (!req.params.id) return  // 檢查前端帶入是否為空值

  const id = req.params.id
  // 透過 id 找到要編輯的資料
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', { restaurant }) })
    .catch(err => console.log(err))
})
// 編輯完成後，透過 findByIdAndUpdate() 更新資料
router.put('/:id', (req, res) => {
  if (!req.body) return   

  const id = req.params.id
  const editedRestaurant = req.body
  Restaurant.findByIdAndUpdate(id, editedRestaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router