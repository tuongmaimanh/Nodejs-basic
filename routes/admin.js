const express = require('express')
const path = require('path')
const router = express.Router()
const rootDir = require('../util/path')

router.use('/add-product',(req,res,next) => {
    console.log('another middleware')
    res.sendFile(path.join(rootDir,'views','add-product.html'))
    // next()
})
router.post('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})

module.exports = router