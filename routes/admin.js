const express = require('express')
const router = express.Router()

//require controller
const shoesController = require('../controllers/admin/shoes')
router.get('/',shoesController.list)

module.exports = router