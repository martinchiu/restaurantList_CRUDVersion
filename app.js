// require data and packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantsData = require("./restaurant.json").results
const mongoose = require('mongoose')
const Restaurant = require('./models/Restaurant')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurantList')
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// setting static files
app.use(express.static('public'))
// setting body-parser
app.use(express.urlencoded({ extended: true}))

// routes setting
// 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})
// 瀏覽特定餐廳
app.get('/restaurants/:id', (req, res) => {
  const showId = req.params.id
  return Restaurant.findById(showId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})
// 搜尋餐廳
app.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()

  const restaurant = restaurantsData.filter(function searchKeywords(restaurant){
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  }) 

  res.render('index', {restaurant, keywords})
})
// 新增餐廳
app.get('/restaurant/new', (req, res) => {
  res.render('addRestaurant')
})
app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  console.log(newRestaurant)
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 編輯餐廳資料
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => { res.render('edit', { restaurant })})
    .catch(err => console.log(err))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const editRestaurant = req.body
  Restaurant.findByIdAndUpdate(id, editRestaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})
// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
