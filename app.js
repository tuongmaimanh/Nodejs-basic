
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

 app.use(bodyParser.urlencoded({extended:false}))
 app.use('/add-products',(req,res,next) => {
    console.log('another middleware')
    res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Submit</button></form>')
    // next()
})
app.use('/product',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})
app.use('/',(req,res,next) => {
    console.log('INDEX2')
    res.send('<h1>index2</h1>')
})

app.listen(8000);
