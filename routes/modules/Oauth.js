const express = require('express')
const router = express.Router()

const passport = require('passport')
// 向 Facebook 發出請求
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))
// Facebook 發資料回來
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
// 向 Google 發出請求
router.get('/google',passport.authenticate('google', { 
  scope: ['email', 'profile']
}));
// Google 發資料回來
router.get('/google/callback',passport.authenticate('google', { 
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
