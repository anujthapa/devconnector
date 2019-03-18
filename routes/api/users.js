const express = require("express");
const router = express.Router();
const gravater = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input valiudation
const validateRegisterInput = require("../../validation/register");
const vaidateLoginInput = require("../../validation/login");

//load user model
const User = require("../../models/User");

//@router GEt api/users/test
//@desc   tests users route
//@access Pubic
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@router GEt api/users/register
//@desc   register users route
//@access Pubic
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(404).json({ errors });
    } else {
      const avatar = gravater.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      //bcrypt is used to encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@router GEt api/users/login
//@desc   login users route / returning the token
//@access Pubic

router.post("/login", (req, res) => {
  const { errors, isValid } = vaidateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //finduserbyemail
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }

    //chech password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        /* res.json({ msg: "Success" }); */
        //usermatch
        const payload = {
          id: user.id,
          name: user.name,
          email: user.name,
          avatar: user.avatar
        }; //create jwt payload
        jwt.sign(payload, keys.secretkey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }); //token
      } else {
        errors.password = "Password incorrect";
        res.status(404).json(errors);
      }
    });
  });
});

//@router GEt api/users/current
//@desc   return current user
//@access private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
