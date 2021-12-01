const mongoose = require('mongoose')
const Restaurant = require('../Restaurant')
const restaurantsData = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurantList')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantsData)
    .then(() => {
      console.log('done')
      db.close()
    })
    .catch(error => console.log(error))
})