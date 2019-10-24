"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Models
const User = require("../models/User");
//Middlewares
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authMiddlewares");

router.get("/signup", isLoggedIn, (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  if (req.body.password !== req.body.passwordtwo) {
    req.flash("passwordBad", "This is not the password for this user");
    return res.redirect("/");
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      req.flash("errorUserFind", "This username is already registred");
      return res.redirect("/auth/signup");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ username, password: hashedPassword });
    req.session.currentUser = newUser;
    res.redirect("/posts");
  } catch (error) {
    next(error);
  }
});

router.get("/login", isLoggedIn, (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.redirect("/posts");
      } else {
        req.flash("passwordBad", "This is not the password for this user");
        req.flash("name", username);
        return res.redirect("/auth/login");
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/logout", isNotLoggedIn, (req, res, next) => {
  console.log(`Logged ${req.session.currentUser.username} out!`);
  delete req.session.currentUser;
  res.redirect("/");
});
/* 
router.get("/signup", isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash("errorFormNotFielled"),
    name: req.flash("name"),
    password: req.flash("passwordBad")
  };
  res.render("signup", data);
});

router.post("/signupUser", isLoggedIn, isFormFilled, async (req, res, next) => {
  if (req.body.password !== req.body.passwordtwo) {
    req.flash("passwordBad", "This is not the password for this user");
    return res.redirect("/");
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const shelter = await Shelter.findOne({ username });
    if (user || shelter) {
      req.flash("errorUserFind", "This username is already registred");
      return res.redirect("/");
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ username, password: hashedPassword });
    req.session.currentUser = newUser;
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.post(
  "/signupShelter",
  isLoggedIn,
  isFormFilled,
  async (req, res, next) => {
    if (req.body.password !== req.body.passwordtwo) {
      req.flash("passwordBad", "This is not the password for this user");
      return res.redirect("/");
    }
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      const shelter = await Shelter.findOne({ username });
      if (user || shelter) {
        req.flash("errorUserFind", "This username is already registred");
        return res.redirect("/");
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newShelter = await Shelter.create({
        username,
        password: hashedPassword
      });
      req.session.currentUser = newShelter;
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", (req, res, next) => {
  const data = {
    messages: req.flash("noUser"),
    name: req.flash("name"),
    password: req.flash("passwordBad")
  };
  res.render("index", data);
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const shelter = await Shelter.findOne({ username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.redirect("/");
      } else {
        req.flash("passwordBad", "This is not the password for this user");
        req.flash("name", username);
        return res.redirect("/");
      }
    } else if (shelter) {
      if (bcrypt.compareSync(password, shelter.password)) {
        req.session.currentUser = shelter;
        return res.redirect("/");
      } else {
        req.flash("passwordBad", "This is not the password for this user");
        req.flash("name", username);
        return res.redirect("/");
      }
    } else {
      req.flash("noUser", "Is not user with this username");
      req.flash("name", username);
      return res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
});
*/

module.exports = router;
