var express = require("express");
var router = express.Router();
const moment = require("moment");
const Post = require("../models/Post");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authMiddlewares");
/* GET users listing. */
router.get("/", isNotLoggedIn, async (req, res, next) => {
  const posts = await Post.find().populate("author");
  res.render("posts/index", { posts });
});

router.get("/:id", isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const onePost = await Post.findOne({ _id: id });
  res.render("posts/details", { onePost });
});
router.get("/add", isNotLoggedIn, (req, res, next) => {
  res.render("posts/add", req.session.currentUser);
});

router.post("/add", isNotLoggedIn, async (req, res, next) => {
  const author = req.session.currentUser._id;
  const { title, content } = req.body;
  await Post.create({ title, content, author });
  return res.redirect("/posts");
});

module.exports = router;
