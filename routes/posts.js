var express = require("express");
var router = express.Router();
const moment = require("moment");
const Post = require("../models/Post");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authMiddlewares");

/* GET users listing. */

router.get("/", isNotLoggedIn, async (req, res, next) => {
  const posts = await Post.find().populate("author");
  posts.forEach(post => {
    post.relativeDate = moment(post.date).fromNow();
  });
  posts.reverse();
  res.render("posts/index", { posts });
});

router.get("/:id", isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const onePost = await Post.findOne({ _id: id }).populate("author");
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

router.post("/:id/add", isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const author = req.session.currentUser;
  const { content } = req.body;
  const post = await Post.findOne({ _id: id });
  post.comments.push({ author: author, content: content, date: new Date() });
  post.save();
  return res.redirect("/posts/" + id);
});

router.post("/delete/:id", isNotLoggedIn, async (req, res, next) => {
  const postId = req.params.id;
  await Post.deleteOne({ _id: postId });
  return res.redirect("/users");
});

module.exports = router;
