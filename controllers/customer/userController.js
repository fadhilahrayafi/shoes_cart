const User = require('../../models').User
const passwordHash = require('password-hash')
class UserController{
  static profile(req,res){
    User
      .findByPk(req.session.user.id)
      .then(user => {
        res.render('customer/index',{view:'user/profile',user})
      })
      .catch(err => {
        res.redirect('/profile')
      })
  }

  static login(req,res){
    const opt = {
      where : {
        email : req.body.email
      }
    }
    User
      .findOne(opt)
      .then(result => {
        if(result){
          return result
        }else{
          throw 'email tidak ada'
        }
      })
      .then(result => {
        if(passwordHash.verify(req.body.password, result.password)){
          req.session.user = {
            name : result.name,
            id : result.id
          }
          req.app.locals.user = {
            name : result.name
          }
          req.flash('success',"success login")
          res.redirect('/')
        }else{
          throw 'password salah'
        }
      })
      .catch(err => {
        res.send(err)
      })
  }
  static register(req,res){
    const values = {
      name : req.body.newName,
      email : req.body.newEmail,
      address : req.body.newAddress,
      password : req.body.newPassword
    }
    User
      .create(values)
      .then(result => {
        req.flash('success','success register')
        res.redirect('/')
      })
      .catch(err => {
        for (let i = 0; i < err.errors.length; i++){
          req.flash(err.errors[i].path,err.errors[i].message)
        }
        req.flash("modal",true)
        res.redirect('/')
      })
  }

  static logout(req,res){
    req.session.user = null
    req.app.locals.user = null
    req.flash('success',"Success logout")
    res.redirect('/')
  }
}
module.exports = UserController