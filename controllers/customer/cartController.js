const Transaction = require('../../models').Transaction
const Cart = require('../../models').Cart
const Shoe = require('../../models').Shoe
class CartsController {
  static addCart(req, res) {
    let opt = {
      where : {
        status : 'onCart',
        user_id : req.session.user.id
      }
    }
    let value = {

    }
    Transaction
      .findOne(opt)
      .then(transaction => {
          if(transaction===null){
            value = {
              status:'onCart',
              date: new Date,
              user_id: req.session.user.id
            }
            return Transaction.create(value)
          }else{
            return transaction
          }
      })
      .then(transaction => {
        opt = {
          where : {
            TransactionsId : transaction.id,
            ShoesId: req.params.id
          }
        }
        return Cart.findOne(opt)
      })
      .then(cart => {
        if(cart){
          value = {
            jumlah : cart.jumlah + 1
          }
          return Cart.update(value,opt)
        }else{
          value = {
            TransactionsId : opt.where.TransactionsId,
            ShoesId: opt.where.ShoesId,
            jumlah: 1
          }
          return Cart.create(value)
        }
      })
      .then(cart => {
        req.flash('success',"Success add item to cart")
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static formCart(req,res){
    let opt = {
      where : {
        status : 'onCart',
        user_id : req.session.user.id
      },
      include:[
        {model: Shoe},
      ]
    }
    Transaction
      .findOne(opt)
      .then(transaction => {
        res.render('customer/index',{view:'user/cart',title:'cart',transaction})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static buyCart(req,res){
    res.send(req.body)
  }
}

module.exports = CartsController