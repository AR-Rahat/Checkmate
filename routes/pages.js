const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/index", (req, res) => {
//   res.render('index')
// })

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/verify", (req, res) => {
  res.render("verify");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

module.exports = router;
