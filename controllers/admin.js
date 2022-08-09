const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
  // next()
};

exports.postProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  //add new Product with sequelize assoc auto add create user in products table
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
    .then()
    .catch((err) => console.log(err));
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
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
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.update(
    {
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    },
    { where: { id: id } }
  )
    .then(res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.destroy({where:{id:id}});
  res.redirect("/admin/products");
};
