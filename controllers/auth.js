require("dotenv").config();

const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.signup = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "select email from test where email=?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.render("signup", {
          message: "The email is already in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("signup", {
          message: "Passwords do not match",
        });
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      // var email = $("#email").val();
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }

      // // localStorage.setItem("digitvalue", OTP);
      var Body = "Your OTP is : " + OTP;

      // Email.send({
      //   Host: "smtp.gmail.com",
      //   Username: "checkmate.sdp@gmail.com",
      //   Password: "beaking12",
      //   To: email,
      //   From: "checkmate.sdp@gmail.com",
      //   Subject: "Verification code for Checkmate profile.",
      //   Body: Body,
      // }).then((message) => {
      //   return res.render("verify");
      // });

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      let mailOptions = {
        from: "checkmate.sdp@gmail.com",
        to: email,
        subject: "Verification code for Checkmate profile.",
        text: "Your OTP is : " + OTP,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.render("verify");
        }
      });

      module.exports = {
        name: name,
        email: email,
        password: hashedPassword,
        OTP: OTP,
      };

      // db.query(
      //   "insert into test set ?",
      //   { name: name, email: email, password: hashedPassword },
      //   (error, results) => {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log(results);
      //       return res.render("signup", {
      //         message: "User registered",
      //       });
      //     }
      //   }
      // );
    }
  );
};
