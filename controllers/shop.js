const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll({})
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Shop",
        path: "/products",
        hasProduct: products.length > 0,
        activeShop: true,
        productCSS: true,
        layout: false,
      });
    })
    .catch((err) => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products",
        product: product,
      });
    })
    .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll({})
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "All Products",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      console.log("CART:", cart);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cart,
      });
    })
    .catch((err) => console.log(err));
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  // Product.findById(productId).then(product => {
  //   console.log('REQ.USER',req.user)
  //   return req.user.addToCart(product)
  // }).then(result => {
  //   console.log(result)
  // })

  //instead of get all product we just get productId and use it in addToCart()
  req.user
    .addToCart(productId)
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(res.redirect("orders"))
    .catch((err) => console.log(err));
};

exports.getOrder = (req, res, next) => {
  req.user.getOrder().then((orders) => {
    res.render("shop/orders", {
      path: "/orders",
      pageTitle: "Yours Orders",
      orders: orders,
    });
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteCartItem(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
