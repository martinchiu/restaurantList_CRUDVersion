const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../Restaurant')
const User = require('../user')
// 種子資料
const restaurantsData = require('../../restaurant.json').results
const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [0, 1, 2]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [3, 4, 5]
  }
]

// 取得連線狀態
const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, (seedUser) => {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name || 'Seeder',
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const seedRestaurant = []
        seedUser.restaurantId.forEach(index => {
          restaurantsData[index].userId = user._id
          seedRestaurant.push(restaurantsData[index])
        })
        return Restaurant.create(seedRestaurant)
      })
  }))
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(error => console.log(error))
})
