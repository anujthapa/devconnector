const express = require("express");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const post = require("./routes/api/post");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("database is connected"))
  .catch(err => console.log(err));

//passsword middleware
app.use(passport.initialize());

//password config
require("./config/passport")(passport);

//use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/post", post);

app.listen(PORT, () => console.log(`server reunning on port ${PORT}`));
