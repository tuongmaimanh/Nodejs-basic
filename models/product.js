const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  userId: {
    type: Schema.Types.ObjectId,ref:'User',required:true
  }
})

module.exports = mongoose.model('Product', productSchema)
// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//   constructor(title, price, description, imageUrl, prodId, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     (this._id = prodId), (this.userId = userId);
//   }

//   //UPDATE OR INSERT
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();

//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   }

//   static deleteById(prodId,userId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(() => {
//         return getDb().collection('users').updateOne({_id: new mongodb.ObjectId(userId)},{$pull:{'cart.items':{productId:new mongodb.ObjectId(prodId)}}})
//       })
//   }
// }

// module.exports = Product;
