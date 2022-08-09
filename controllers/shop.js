const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.findAll({})
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
  Product.findAll({ where: { id: productId } })
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Product Detail",
        path: "/products",
        product: product[0],
      });
    })
    .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  Product.findAll({})
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
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
        });
      });
    })
    .catch((err) => console.log(err));
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProduct(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchCart.setProducts(null);
    })
    .then(res.redirect("orders"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include:['products']}).then((orders) => {
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
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
