const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const errorController = require("./controllers/error");
const mongoConnect = require('./util/database').mongoConnect
const User = require ('./models/user')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next) => {
  User.findById('62f3d2b98541976e87855552')
  .then(user =>{
    req.user = new User(user.name, user.email, user.cart,user._id)
    console.log('user:',user)
    next()
  })
  .catch(err => console.log(err))

})

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(8000)
})
