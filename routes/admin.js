const express = require('express')
const path = require('path')
const router = express.Router()
const adminController = require('../controllers/admin')
const { route } = require('./shop')



router.get('/add-product',adminController.getAddProduct)
router.post('/add-product',adminController.postProduct)
router.get('/products',adminController.getProducts)

//admin/edit-product/:productId => GET
router.get('/edit-product/:productId', adminController.getEditProduct)
//admin/edit-product => POST
router.post('/edit-product',adminController.postEditProduct)

router.post('/delete-product',adminController.postDeleteProduct)
module.exports = router