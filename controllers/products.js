const Product = require('../models/product')

exports.getAddProduct = (req,res,next) => {
    res.render('add-product',{pageTitle:'Add Product',path:'/admin/add-product',formsCSS: true, productCSS: true,activeAddProduct: true})
    // next()
}

exports.postProduct = (req,res,next)=>{
    const products = new Product(req.body.title)
    products.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    res.render("shop", {
      products: products.fetchAll(),
      pageTitle: "Shop",
      path: "/",
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false,
    });
  }