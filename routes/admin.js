const express = require('express')
const path = require('path')
const router = express.Router()

router.use('/add-products',(req,res,next) => {
    console.log('another middleware')
    res.sendFile(path.join(__dirname,'../','views','shop.html'))
    // next()
})
router.post('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})

module.exports = router