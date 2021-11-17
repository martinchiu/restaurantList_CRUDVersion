// require data and packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', {restaurant: restaurantsList.results})
})
app.get('/restaurants/:id', (req, res) => {
  const showId = req.params.id
  const showTarget = restaurantsList.results.find(restaurant => restaurant.id.toString() === showId)
  res.render('show', { restaurant: showTarget})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
