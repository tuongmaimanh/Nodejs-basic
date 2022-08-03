const Product = require('../models/product')


exports.getAddProduct = (req,res,next) => {
    res.render('admin/add-product',{pageTitle:'Add Product',path:'/admin/add-product',formsCSS: true, productCSS: true,activeAddProduct: true})
    // next()
}

exports.postProduct = (req,res,next)=>{
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    
    const products = new Product(title,imageUrl,description,price)
    products.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>{
 
      res.render("admin/products", {
          products: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
          hasProduct: products.length > 0,
          activeShop: true,
          productCSS: true,
          layout: false,
        });
    })  
   }