const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    return getDb().collection("products").insertOne(this);
  }

  addToCart(productId) {
    const index = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === productId.toString();
    });
    let updateCartItems = [...this.cart.items];

    if (index >= 0) {
      updateCartItems[index].quantity += 1;
    } else {
      updateCartItems.push({
        productId: new mongodb.ObjectId(productId),
        quantity: 1,
      });
    }

    const updateCart = { items: updateCartItems };
    return getDb()
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updateCart } }
      );
  }

  getCart() {
    const productIds = this.cart.items.map((i) => i.productId);
    return getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find(
              (i) => i.productId.toString() === p._id.toString()
            ).quantity,
          };
        });
      });
  }

  deleteCartItem(prodId) {
    return getDb()
      .collection("users")
      .updateOne(
        { _id: this._id },
        { $pull: { "cart.items": { productId: new mongodb.ObjectId(prodId) } } }
      );
  }

  addOrder() {
    return this.getCart().then(cart => {
      const order = {
        cart: cart,
        user: {
          _id: new mongodb.ObjectId(this._id),
          name: this.name
        }
      }
      return getDb().collection('orders').insertOne(order)
    })
      .then((result) => {
        this.cart = { items: [] };
        return getDb()
          .collection("users")
          .updateOne(
            { _id: new mongodb.ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  static findById(useId) {
    return getDb()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(useId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOrder(){
    return getDb().collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray()
  }
}

module.exports = User;
