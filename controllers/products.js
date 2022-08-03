const products = []


exports.getAddProduct = (req,res,next) => {
    res.render('add-product',{pageTitle:'Add Product',path:'/admin/add-product',formsCSS: true, productCSS: true,activeAddProduct: true})
    // next()
}

exports.postProduct = (req,res,next)=>{
    products.push({title:req.body.title})
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    res.render("shop", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false,
    });
  }