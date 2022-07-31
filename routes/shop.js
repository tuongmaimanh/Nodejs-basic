const express = require('express')
const patch = require('path')
const router = express.Router()
const rootDir = require('../util/path')

router.get('/',(req,res,next) => {
    console.log('INDEX2')
    res.sendFile(patch.join(rootDir,'views','shop.html'))
})

module.exports = router