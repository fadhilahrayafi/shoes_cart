const ShoeModel = require('../../models').Shoe
const Transaction = require('../../models').Transaction
const User = require('../../models').User
const Cart = require('../../models').Cart


class Shoes {
  static list(req, res) {
    //contoh err message
    //look index view message
    //mau render mau redirect gamasalah
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
    const objShoe = {
      name: req.body.name,
      image: req.body.image,
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
        req.flash("modal", true)
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
    User
      .findAll(
        {
          include: [
            {
              model: Transaction,
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
        res.render('admin/index', { view: 'shoes/transaction', users })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static detailTransaction(req, res) {
    // res.send(req.params)
    User
      .findAll(
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
        res.send(users[0].Transactions[0].Carts[0])
        res.render('admin/index', { view: 'shoes/detailShoe', detail: users[0].Transactions[0].Carts[0] })
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = Shoes