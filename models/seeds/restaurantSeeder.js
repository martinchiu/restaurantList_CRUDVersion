const Restaurant = require('../Restaurant')
const restaurantsData = require('../../restaurant.json').results


const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantsData)
    .then(() => {
      console.log('done')
      db.close()
    })
    .catch(error => console.log(error))
})