const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const passport = require("passport");

//Post modol
const Post = require("../../models/Post");

//Post modol
const Profile = require("../../models/Profile");

//validation for post
const validatePost = require("../../validation/post");
//@router GEt api/posts/test
//@desc   tests post route
//@access Pubic
router.get("/test", (req, res) => res.json({ msg: "Post Works" }));

//@router Get api/posts/
//@desc    post route
//@access public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
});

//@router Get api/posts/:post_id
//@desc    post route
//@access public

router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json(err));
});

//@router Delete api/posts/:post_id
//@desc    post route
//@access private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(404)
              .json({ notauthorize: "user not authorized" });
          }
          post.remove().then(() => res.json({ sucess: true }));
        })
        .catch(err => res.status(404).json({ Postnotfound: "Post Not Found" }));
    });
  }
);

//@router Post api/posts/
//@desc    post route
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      //if anny errors send 400 with errors object
      res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@router Post api/posts/Like/:id
//@desc    post route
//@access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already like this post" });
          }
          //add user id to likes
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post Not Found" }));
    });
  }
);

//@router Post api/posts/unLike/:id
//@desc    post route
//@access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findOne({ user: req.user.id })
        .then(post => {
          //filter with id and save
          post.likes.filter(item => item.user.toString() != req.user.id);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post Not Found" }));
    });
  }
);

//@router Post api/posts/comment/:id
//@desc    post comment
//@access private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePost(req.body);
    if (!isValid) {
      //if anny errors send 400 with errors object
      res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.name,
          user: req.user.id
        };

        // add to comment array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json({ postnotfound: "No post found" }));
  }
);

//@router Post api/posts/comment/:id/:comment_id
//@desc    delete comment
//@access private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(404).json({ errors: "comment doesnot exist" });
        }

        //get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        res.send(removeIndex);

        //splice ot of array
        post.comments.splice(removeIndex, 1);
        post.save().res.json(post);
      })
      .catch(err => res.status(400).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
