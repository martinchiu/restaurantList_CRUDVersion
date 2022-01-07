module.exports = {
  createLocals: (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success = req.flash('success')
    res.locals.warning = req.flash('warning')
    next()
  }
}
