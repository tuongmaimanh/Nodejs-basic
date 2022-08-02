const express = require('express')
const patch = require('path')
const router = express.Router()
const rootDir = require('../util/path')
const adminData = require('./admin')

router.get('/',(req,res,next) => {
    res.render('shop')
})

module.exports = router