var express = require("express");
var router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authMiddlewares");
/* GET home page. */

router.get("/", isLoggedIn, function(req, res, next) {
  res.render("index");
});
router.get("/", function(req, res, next) {
  res.render("posts/index");
});

module.exports = router;
