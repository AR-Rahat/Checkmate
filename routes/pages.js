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
  // if (req.session.viewcount) {
  //   req.session.viewcount++;
  //   return res.render("login", {
  //     message: "you have visited this page " + $req.session.viewcount + "times",
  //   });
  // } else {
  //   req.session.viewcount = 1;
  //   return res.render("login", {
  //     message: "you have visited this page " + $req.session.viewcount + "times",
  //   });
  // }
  console.log(req.session);
  res.render("login");
});

router.get("/verify", (req, res) => {
  res.render("verify");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

router.get("/chessgame", (req, res) => {
  res.render("chessgame");
});

module.exports = router;
