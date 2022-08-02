const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require('../util/path')
const products = []


router.get('/add-product',(req,res,next) => {
    console.log('another middleware')
    res.sendFile(path.join(rootDir,'views','add-product.html'))
    // next()
})
router.post('/add-product',(req,res,next)=>{
    products.push({title:req.body.title})
    res.redirect('/')
})

exports.routes = router
exports.products = products

