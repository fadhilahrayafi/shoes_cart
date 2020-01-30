class AppController{
  static list(req,res){
    res.render('customer/index',{view:"shoes/list",title:"Shoes"})
  }
}
module.exports = AppController