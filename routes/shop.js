const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    console.log('INDEX2')
    res.send('<h1>index2</h1>')
    next()
})

module.exports = router