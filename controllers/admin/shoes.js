const ShoeModel = require('/home/fadhilah/Documents/phase-1-ngulang/week4/shoes_cart/models').Shoe

class Shoes {
  static list(req, res) {
    //contoh err message
    //look index view message
    //mau render mau redirect gamasalah
    ShoeModel.findAll()
      .then(shoes => {
        // req.flash('success',"test")
        res.render('admin/index', { view: 'shoes/list', title: "shoes", shoes })
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
    res.render('admin/index', { view: 'shoes/add', title: "shoe add" })
  }

  static add(req, res) {
    const objShoe = {
      name: req.body.name,
      image: req.body.image,
      stock: Number(req.body.stock),
      price: Number(req.body.price)
    }
    ShoeModel.create(objShoe)
      .then(() => {
        res.redirect('/admin')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static formEdit(req, res) {
    ShoeModel.findOne({ where: { id: req.params.shoeId } })
      .then(shoe => {
        res.render('admin/index', { view: 'shoes/edit', title: "shoe edit", shoe })
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
      price: Number(req.body.price)
    }
    ShoeModel.update(objShoe, { where: { id: req.params.shoeId } })
      .then(() => {
        res.redirect('/admin')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = Shoes