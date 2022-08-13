const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
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
  Product.find()
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
  User.findOne({ _id: req.user._id })
    .then((user) => {
      console.log("CART:", user.cart.items);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: user.cart.items,
      });
    })
    .catch((err) => console.log(err));
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findOne({ _id: productId })
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = async (req, res, next) => {
  await req.user
    .populate("cart.items.productId")
    .then((user) => {
      //get order from cart of user
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        cart: products,
      });
      
      return order.save();
    })
    .then(()=>{
        req.user.cart.items = []
        return req.user.save()
    })
    .then(() => res.redirect("/orders"))
    .catch((err) => console.log(err));
};

exports.getOrder = async(req, res, next) => {
 await Order.find({'user._id':req.user._id}).then((orders) => {
  // Product.find({_id: {$in: orders}})  
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
  User.updateOne(
    { _id: req.user._id },
    { $pull: { "cart.items": { productId: prodId } } }
  )
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
