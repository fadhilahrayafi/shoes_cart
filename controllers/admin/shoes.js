//require model
class Shoes{
  static list(req,res){
    //contoh err message
    //look index view message
    //mau render mau redirect gamasalah
    req.flash('success',"test")
    res.render('admin/index',{view:'shoes/list',title:"shoes"})
  }
}

module.exports = Shoes