const Product = require('../models/product')


exports.getProducts = (req, res, next) => {
   Product.fetchAll((products) =>{

     res.render("shop/product-list", {
         products: products,
         pageTitle: "Shop",
         path: "/",
         hasProduct: products.length > 0,
         activeShop: true,
         productCSS: true,
         layout: false,
       });
   })  
  }
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId

    Product.findById(productId,product=>{

        res.render('shop/product-detail',{
            pageTitle: 'Product Detail',
            path: '/products',
            product: product
        })
    })
}
exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) =>{
 
      res.render("shop/index", {
          products: products,
          pageTitle: "All Products",
          path: "/products",
        });
    })  
   }

exports.getCart = (req,res,next) => {
    res.render('shop/cart',{
        path: '/cart',
        pageTitle: 'Your Cart'
    })
}
exports.getOrders = (req,res,next) => {
    res.render('shop/orders',{
        path: '/orders',
        pageTitle: 'Yours Orders'
    })
}
exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}