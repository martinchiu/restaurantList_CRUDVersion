const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

// register
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { email, password, confirmPassword } = req.body
  const name = req.body.name || 'client'  // 因為 name 非必填，使用者未填時自動賦值
  
  const errors = []
  if ( !email || !password || !confirmPassword) {
    errors.push({ message: '除了名字以外，所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.render('login', { email })) // 註冊完成導回登入頁，並帶上註冊的 email
        .catch(err => console.log(err))
  })
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router