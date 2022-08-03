const express = require("express");
const patch = require("path");
const router = express.Router();
const rootDir = require("../util/path");
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  console.log(products);
  res.render("shop", {
    products: products,
    pageTitle: "Shop",
    path: "/",
    hasProduct: products.length > 0,
    activeShop: true,
    productCSS: true,
    layout: false,
  });
});

module.exports = router;
