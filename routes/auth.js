const express = require("express");
const authcontroller = require("../controllers/auth");

const router = express.Router();

router.post("/signup", authcontroller.signup);
router.post("/verify", authcontroller.verify);
router.post("/login", authcontroller.login);
router.post("/homepage", authcontroller.homepage);
router.post("/chessgame", authcontroller.chessgame);
router.post("/logout", (req, res) => {
  req.session.isAuth = false;
  console.log(req.session.isAuth);
  console.log(req.session);
  req.session.destroy((error) => {
    if (error) console.log(error);
    //res.redirect("/");
    res.render("index");
  });
});

module.exports = router;
