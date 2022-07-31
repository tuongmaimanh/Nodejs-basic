const express = require('express')
const patch = require('path')
const router = express.Router()
const rootDir = require('../util/path')
const adminData = require('./admin')

router.get('/',(req,res,next) => {
    console.log('shop',adminData.products)
    res.sendFile(patch.join(rootDir,'views','shop.html'))
})

module.exports = router