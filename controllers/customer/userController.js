const User = require('../../models').User
const passwordHash = require('password-hash')
const mailer = require('../../helpers/mailer')
class UserController {
  static profile(req, res) {
    User
      .findByPk(req.session.user.id)
      .then(user => {
        res.render('customer/index', { view: 'user/profile', user })
      })
      .catch(err => {
        res.redirect('/profile')
      })
  }

  static login(req, res) {
    const opt = {
      where: {
        email: req.body.email
      }
    }
    User
      .findOne(opt)
      .then(result => {
        console.log(result)
        if (result) {
          return result
        } else {
          throw 'email tidak ada'
        }
      })
      .then(result => {
        if (passwordHash.verify(req.body.password, result.password)) {
          req.session.user = {
            name: result.name,
            id: result.id
          }
          req.app.locals.user = {
            name: result.name
          }
          req.flash('success', "success login")
          res.redirect('/')
        } else {
          throw 'password salah'
        }
      })
      .catch(err => {
        req.flash("error","username/password salah")
        req.flash("modal", true)
        res.redirect('/')
      })
  }
  static register(req, res) {
    const values = {
      name: req.body.newName,
      email: req.body.newEmail,
      address: req.body.newAddress,
      password: req.body.newPassword
    }
    User
      .create(values)
      .then(result => {
        let message = `Hello! ${values.name}<br>
        We are from Shoe Cart is informing you about your registration on our web store<br>
        You are now can start shoping on Shoe Cart by logging in with your email<br><br>
        Happy Shopping!`
        mailer(values.email, message)
        req.flash('success', 'success register')
        res.redirect('/')
      })
      .catch(err => {
        for (let i = 0; i < err.errors.length; i++) {
          req.flash(err.errors[i].path, err.errors[i].message)
        }
        req.flash("modal", true)
        res.redirect('/')
      })
  }

  static logout(req, res) {
    req.session.user = null
    req.app.locals.user = null
    req.flash('success', "Success logout")
    res.redirect('/')
  }
}
module.exports = UserController