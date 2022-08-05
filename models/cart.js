const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const exisitingProdIndex = cart.products.findIndex(
        (item) => item.id === id
      );
      if (exisitingProdIndex !== -1) {
        cart.products[exisitingProdIndex].qty += 1;
      } else {
        cart.products.push({ id, qty: 1 });
      }
      cart.totalPrice += +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updateCart = { ...JSON.parse(fileContent) };
      const product = updateCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
    }
      updateCart.products = updateCart.products.filter(
        (prod) => prod.id !== id
      );
      updateCart.totalPrice =
        updateCart.totalPrice - productPrice * product.qty;

      fs.writeFile(p, JSON.stringify(updateCart), (err) => {
        console.log(err);
      });
    });
  }

  static getProducts(cb){
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent)
        if(err){
          cb(null)
        }else{

          cb(cart)
        }
    })
  }


};
