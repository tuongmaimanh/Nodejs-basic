const express = require('express')
const path = require('path')
const router = express.Router()
const productController = require('../controllers/products')
const { route } = require('./shop')



router.get('/add-product',productController.getAddProduct)
router.post('/add-product',productController.postProduct)

module.exports = router