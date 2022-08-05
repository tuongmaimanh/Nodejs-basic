const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      hasProduct: products.length > 0,
      activeShop: true,
      productCSS: true,
      layout: false,
    });
  });
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      path: "/products",
      product: product,
    });
  });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      pageTitle: "All Products",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        products: cartProducts,
        path: "/cart",
        pageTitle: "Your Cart",
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    console.log(typeof product.price);
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Yours Orders",
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price)
        res.redirect('/cart')
    })
}
