// require data and packages used in the project
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

// 引入 Schema
const Restaurant = require('./models/Restaurant')
// 引入 config
require('./config/mongoose')
// 引用路由器
const routes = require('./routes')

const port = 3000

const app = express()

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// setting methodOverride
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
