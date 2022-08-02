const express = require('express')
const patch = require('path')
const router = express.Router()
const rootDir = require('../util/path')
const adminData = require('./admin')

router.get('/',(req,res,next) => {
    const products = adminData.products
    console.log(products)
    res.render('shop',{products:products,docTitle:'Shop',path:'/'})
})

module.exports = router