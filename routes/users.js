const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { parser } = require("../config/cloudinary.js");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authMiddlewares");

router.get("/", isNotLoggedIn, async (req, res, next) => {
  const user = req.session.currentUser;
  const posts = await Post.find({ author: user._id });
  res.render("./users/edit-user", { user, posts });
});

router.get("/:id", isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const oneUser = await User.findOne({ _id: id });
  const userPosts = await Post.find({ author: id });
  res.render("users/user", { oneUser, userPosts });
});

router.post("/edit", isNotLoggedIn, async (req, res, next) => {
  const id = req.session.currentUser._id;
  const { name, email, age, city, phone } = req.body;
  await User.findByIdAndUpdate(id, {
    name,
    email,
    age,
    city,
    phone
  });
  const user = await User.findById(id);
  req.session.currentUser = user;
  return res.redirect("/users");
});

router.post(
  "/addphoto",
  parser.single("image"),
  isNotLoggedIn,
  async (req, res, next) => {
    try {
      const image = req.file.secure_url;
      const { _id } = req.session.currentUser;
      await User.findByIdAndUpdate(_id, { image: image });
      user = await User.findById(_id);
      req.session.currentUser = user;
      return res.redirect("/users");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
