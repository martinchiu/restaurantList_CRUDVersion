const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI
// 設定連線到 mongoDB
// mongodb://[資料庫帳號]:[資料庫密碼]@[MongoDB位置]:[port]/[資料庫名稱]
// 資料庫的位置，通常會是一個 IP 或是網址，預設位置是 localhost:27017，PORT 是 27017，這裡可以省略
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

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

module.exports = db
