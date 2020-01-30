function checkSession(req, res, next) {
  if (!req.session.user) {
    req.app.locals.user = null
  }
  next()
}

function checkLogin(req, res, next) {
  if (!req.app.locals.user || !req.session.user) {
    req.flash('modal', true)
    res.redirect('/')
  }
  next()
}


module.exports = { checkSession, checkLogin }