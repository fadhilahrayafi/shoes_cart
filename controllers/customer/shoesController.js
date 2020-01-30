const ShoeModel = require('../../models').Shoe
class ShoesController {
  static list(req, res) {
    ShoeModel.findAll()
      .then(shoes => {
        // req.flash('success',"test")
        res.render('customer/index', { view: 'shoes/list', title: "shoes", shoes })
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = ShoesController