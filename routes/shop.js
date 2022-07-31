const express = require('express')
const patch = require('path')
const router = express.Router()

router.get('/',(req,res,next) => {
    console.log('INDEX2')
    res.sendFile(patch.join(__dirname,'../','views','shop.html'))
})

module.exports = router