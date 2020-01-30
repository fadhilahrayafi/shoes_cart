const express = require('express')
const router = express.Router()

//require controller
const shoesController = require('../controllers/admin/shoes')
router.get('/', shoesController.list)
router.get('/delete/:shoeId', shoesController.delete)
router.get('/add', shoesController.formAdd)
router.post('/add', shoesController.add)
router.get('/edit/:shoeId', shoesController.formEdit)
router.post('/edit/:shoeId', shoesController.edit)
router.get('/transaction', shoesController.listTransaction)
router.get('/transaction/detail/:userId/:transactionId', shoesController.detailTransaction)
router.get('/transaction/updateStatus/:userId/:transactionId', shoesController.updateStatus)


module.exports = router