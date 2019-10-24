var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authMiddlewares");

router.get("/", isNotLoggedIn, (req, res, next) => {
  const id = req.session.currentUser._id;

  res.render("./users/edit-user", req.session.currentUser);
});

router.get("/:id", isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const oneUser = await User.findOne({ _id: id }).populate("posts");
  console.log(oneUser);
  res.render("users/user", { oneUser });
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
  return res.redirect("/user");
});

module.exports = router;
