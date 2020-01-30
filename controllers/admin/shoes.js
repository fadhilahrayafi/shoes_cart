const ShoeModel = require('../../models').Shoe
const Transaction = require('../../models').Transaction
const User = require('../../models').User
const Cart = require('../../models').Cart
const Admin = require('../../models').Admin
const Op = require('sequelize').Op
const sequelize = require('sequelize')
const mailer = require('../../helpers/mailer')
const passwordHash = require('password-hash')


class Shoes {
  static list(req, res) {
    ShoeModel.findAll()
      .then(shoes => {

        res.render('admin/index', { view: 'shoes/list', shoes })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static delete(req, res) {
    ShoeModel.destroy({ where: { id: req.params.shoeId } })
      .then(() => {
        res.redirect('/admin')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static formAdd(req, res) {
    res.render('admin/index', { view: 'shoes/add' })
  }

  static add(req, res) {
    if(!req.file){
      req.flash("error", "no image")
      res.redirect('/admin/add')
    }
    const objShoe = {
      name: req.body.name,
      img: req.file.path,
      stock: Number(req.body.stock),
      price: Number(req.body.price) == 0 ? "" : req.body.price
    }
    ShoeModel.create(objShoe)
      .then(() => {
        req.flash('success', "successfully adding new shoe item")
        res.redirect('/admin')
      })
      .catch(err => {
        for (let i = 0; i < err.errors.length; i++) {
          req.flash(err.errors[i].path, err.errors[i].message)
        }
        res.redirect('/admin/add')
      })
  }

  static formEdit(req, res) {
    ShoeModel.findOne({ where: { id: req.params.shoeId } })
      .then(shoe => {
        res.render('admin/index', { view: 'shoes/edit', shoe })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static edit(req, res) {
    const objShoe = {
      name: req.body.name,
      image: req.body.image,
      stock: Number(req.body.stock),
      price: Number(req.body.price) == 0 ? "" : req.body.price
    }
    ShoeModel.update(objShoe, { where: { id: req.params.shoeId } })
      .then(() => {
        res.redirect('/admin')
      })
      .catch(err => {
        for (let i = 0; i < err.errors.length; i++) {
          req.flash(err.errors[i].path, err.errors[i].message)
        }
        req.flash("modal", true)
        res.redirect(`/admin/edit/${req.params.shoeId}`)
      })
  }

  static listTransaction(req, res) {
    Transaction
      .findAll(
        {
          include: [
              {
                model: User, 
              },
              {
                model: Cart,
                include: [
                  {
                    model: ShoeModel
                  }
                ]
              }
          ],
          where: { 
            status: {
            [Op.or]:[
                "onProgress", "complete"
              ]
            }
          },
          order: [sequelize.literal(`CASE status
              WHEN 'onProgress' THEN 1
              ELSE 2
          END`)]
        }
      )
      .then(transaction => {
        // res.send(users)
        res.render('admin/index', { view: 'shoes/transaction', transaction })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static detailTransaction(req, res) {
    // res.send(req.params)
    User
      .findOne(
        {
          include: [
            {
              model: Transaction, where: { id: req.params.transactionId },
              include: [
                {
                  model: Cart,
                  include: [
                    {
                      model: ShoeModel
                    }
                  ]
                }
              ]
            }
          ]
        })
      .then(users => {
        // res.send(users)
        res.render('admin/index', { view: 'shoes/detailShoe', users })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static updateStatus(req, res) {
    let objTrasaction = {
      status: "complete"
    }
    Transaction.update(objTrasaction, { where: { id: Number(req.params.transactionId) } })
      .then(() => {

        return User.findByPk(req.params.userId)
      })
      .then(user => {
        let message = `Hello! ${user.name} <br>
        we are from Shoe Cart want to inform you about your latest transaction!<br> 
        your transaction is ready to be delivered and will come as soon as possible!<br><br>
        Thank you for trusting our company...`
        mailer(user.email, message)
        req.flash('success', "successfully updating transaction status")
        res.redirect('/admin/transaction')
      })
      .catch(err => {
        res.send(err)
      })

  }

  static login(req, res, next) {
    if (req.body.email !== "admin@shoecart.com") {
      next()
    }else{
      const opt = {
        where: {
          email: req.body.email
        }
      }
      Admin
        .findOne(opt)
        .then(result => {
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
            res.redirect('/admin')
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
  }

}

module.exports = Shoes