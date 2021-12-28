// 使用建立好的model 來新增data
const Restaurant = require('../Restaurant')
// 待建立的data
const restaurantsData = require('../../restaurant.json').results

// 取得連線狀態
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantsData)  // 建立document
    .then(() => {
      console.log('done')
      db.close()
    })
    .catch(error => console.log(error))
})

