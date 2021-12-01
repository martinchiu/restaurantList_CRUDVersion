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
  for (let i = 0; i < restaurantsData.length; i++) {
    Restaurant.create({ 
      name: `${restaurantsData[i].name}`,
      name_en: `${restaurantsData[i].name_en}`,
      category: `${restaurantsData[i].category}`,
      image: `${restaurantsData[i].image}`,
      location: `${restaurantsData[i].location}`,
      phone: `${restaurantsData[i].phone}`,
      google_map: `${restaurantsData[i].google_map}`,
      rating: `${restaurantsData[i].rating}`,
      description: `${restaurantsData[i].description}`
    })
  }
  console.log('done')
})