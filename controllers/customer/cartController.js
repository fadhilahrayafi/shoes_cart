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
        // res.send(transaction)
        if(transaction){
          res.render('customer/index',{view:'user/cart',transaction})
        }else{
          let value = {
            status:'onCart',
            date: new Date,
            user_id: req.session.user.id
          }
          return Transaction.create(value)
        }
      })
      .then(transaction => {
        return Transaction
                .findOne(opt)
      })
      .then(transaction => {
        res.render('customer/index',{view:'user/cart',transaction})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static buyCart(req,res){
    //res.send(req.body)
    let values = []
    if(!req.body.ShoesId){
      req.flash("error","no item")
      res.redirect('back')
    }
    for (let i = 0; i < req.body.ShoesId.length; i++){
      let value = {
        jumlah: req.body.jumlah[i]
      }
      values.push(value)
    }
    let opt = {
      where:{
        TransactionsId : req.body.TransactionsId
      },
      order: [['id', 'ASC']]
    }
    Cart
      .findAll(opt)
      .then(carts => {
        
        let promises = []
        for (let i =0 ; i < carts.length; i++){
          promises.push(carts[i].update(values[i],{returning:true}))
        }
        return Promise.all(promises)
      })
      .then(carts => {
        let promises = []
        for (let i =0 ; i < carts.length; i++){
          let opt = {
            include: [
              {model: Shoe},
            ],
            where:{
              id:carts[i].id
            },
          }
          promises
            .push(
              Cart
                .findOne(opt)
            )
        }
        return Promise.all(promises)
      })
      .then(carts => {
        let error = []
        for (let i = 0; i < carts.length; i++){
          if(carts[i].Shoe.stock < carts[i].jumlah){
            error.push('')
            req.flash(carts[i].Shoe.name,'sisa ' + carts[i].Shoe.stock)
          }
        }
        if(error.length > 0){
          res.redirect('back')
        }else{
          return carts
        }
      })
      .then(carts => {
        let promises = []
        for (let i = 0; i < carts.length; i++){
          let value = {
            stock: carts[i].Shoe.stock - carts[i].jumlah
          }
          promises.push(carts[i].Shoe.update(value))
        }
        return Promise.all(promises)
        
      })
      .then(shoes => {
        let value = {
          status : "onProgress"
        }
        let opt = {
          where : {
            id : req.body.TransactionsId
          }
        }
        return Transaction.update(value,opt)
      })
      .then(transaction => {
        req.flash('success',"Pembelian berhasil sekalian melakukan pembayaran")
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = CartsController