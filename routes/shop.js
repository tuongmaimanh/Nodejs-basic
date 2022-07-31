const express = require('express')
const router = express.Router()

router.use('/',(req,res,next) => {
    console.log('INDEX2')
    res.send('<h1>index2</h1>')
})

module.exports = router