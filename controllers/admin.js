const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing:false
  });
  // next()
};

exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const products = new Product(null,title, imageUrl, description, price);
  products.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false,
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId =req.params.productId
  Product.findById(productId,product =>{
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: editMode,
        product: product
      });
  })
};

exports.postEditProduct = (req,res,next) =>{
  const id = req.body.productId
    const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const products = new Product(id,title, imageUrl, description, price);
  products.save();
  res.redirect("/");
}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productId
    Product.deleteById(id)
    res.redirect('/admin/products')
}
