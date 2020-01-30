const express = require('express')
const router = express.Router()
const appController = require('../controllers/customer/appController')
const userController = require('../controllers/customer/userController')
const shoesController = require('../controllers/customer/shoesController')
const cartsController = require('../controllers/customer/cartController')
const middleware = require('../middlewares/middleware')
const ControllerAdmin = require('../controllers/admin/shoes')
//require model
router.get('/', shoesController.list)
router.post('/login', ControllerAdmin.login, userController.login)
router.get('/logout', userController.logout)
router.post('/register', userController.register)

router.use(middleware.checkLogin)
router.get('/profile', userController.profile)
router.get('/cart', cartsController.formCart)
router.post('/cart', cartsController.buyCart)
router.get('/cart/:id', cartsController.addCart)

module.exports = router