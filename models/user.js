const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    return getDb().collection("products").insertOne(this);
  }

  static findById(useId) {
    return getDb()
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(useId) })
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
