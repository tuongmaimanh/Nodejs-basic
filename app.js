const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62f6632b1215c2db75dc19a6")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://admin:admin1234@cluster0.utnmy.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    User.findOne().then((user) => {
        console.log(user)
      if (!user) {
        const user = new User({
          name: "tuong",
          email: "tuong@gmail.com",
          cart: { item: [] },
        });
        user.save();
      }
    });
    const PORT = process.env.PORT || 8000
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
