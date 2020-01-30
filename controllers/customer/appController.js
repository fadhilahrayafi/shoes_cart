class AppController{
  static list(req,res){
    res.render('customer/index',{view:"shoes/list"})
  }
}
module.exports = AppController