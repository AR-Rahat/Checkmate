require("dotenv").config();

const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const fs = require("fs");
const express = require("express");
const e = require("express");
const router = express.Router();

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
// });

exports.signup = (req, res) => {
  console.log(req.body);
  var cnt1 = 0,
    cnt2 = 0;
  const { name, email, id, password, passwordConfirm } = req.body;

  db.query(
    "select email from login where email=?",
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
      } else if (password.length < 8) {
        return res.render("signup", {
          message: "Password must be 8 characters long",
        });
      } else cnt1 = 1;
    }
  );

  db.query("select id from login where id=?", [id], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.render("signup", {
        message: "The username is already taken",
      });
    } else if (cnt1 == 1) {
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      // var email = $("#email").val();
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }

      // // localStorage.setItem("digitvalue", OTP);
      //var Body = "Your OTP is : " + OTP;

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
          const user = {
            name: name,
            id: id,
            email: email,
            OTP: OTP,
            pass: hashedPassword,
          };

          const data = JSON.stringify(user);

          fs.writeFile("./user.json", data, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Data saved");
            }
          });

          res.render("verify");
        }
      });
    }
  });
};

exports.verify = (req, res) => {
  console.log(req.body);
  const { OTP } = req.body;
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const user = JSON.parse(data.toString());
      if (user.OTP === OTP) {
        db.query(
          "insert into login set ?",
          {
            name: user.name,
            id: user.id,
            email: user.email,
            password: user.pass,
          },
          (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log(results);
              res.render("login");
            }
          }
        );
      } else {
        return res.render("verify", {
          message: "Incorrect OTP!",
        });
      }
    }
  });
};

exports.login = (req, res) => {
  console.log(req.body);

  const { email_username, password, remember } = req.body;

  if (remember == "yes") {
    console.log("remembered");
  }
  // let username = email_username;
  // let login_pass = password;
  // if (username.indexof("@") > -1) {
  //   db.query(
  //     "select email from login where email=?",
  //     [email_username],
  //     async (error, results) => {
  //       if (error) {
  //         console.log(error);
  //         return res.render("login", {
  //           message: "email isn't registered",
  //         });
  //       }
  //       if (results.length > 0) {
  //         let dbpass = db.query(
  //           "Select password from login where email=?",
  //           [email_username],
  //           async (error, results) => {
  //             if (error) {
  //               console.log(error);
  //             }
  //             if (results.length > 0) {
  //               bcrypt.compare(login_pass, dbpass).then((doMatch) => {
  //                 if (doMatch) {
  //                   console.log("login Successful");
  //                   if (results.length > 0) {
  //                     res.render("/");
  //                   }
  //                 } else {
  //                   return res.render("login", {
  //                     message: "Invalid Password!",
  //                   });
  //                 }
  //               });
  //             }
  //           }
  //         );
  //       }
  //     }
  //   );
  // }
  //else {
  db.query(
    "Select email,id from login where email=? or id=?",
    [email_username, email_username],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.render("login", {
          message: "email or username doesn't exist",
        });
      }
      // if (results.length > 0) {
      //   db.query("")
      //   bcrypt.compare(password,dbpass,function(error,result){
      //     if(error)
      //     {
      //       return res.render("login", {
      //                       message: "Invalid Password!",
      //                     });
      //     }
      //   })
      // }
      if (results.length > 0) {
        db.query(
          "Select password from login where email=? or id=?",
          [email_username, email_username],
          async (error, results) => {
            if (error) {
              console.log(error);
            }
            if (results.length > 0) {
              console.log(results[0].password);
              bcrypt.compare(password, results[0].password).then((doMatch) => {
                if (doMatch) {
                  console.log("login Successful");
                  if (results.length > 0) {
                    res.render("homepage");
                  }
                } else {
                  return res.render("login", {
                    message: "Invalid Password!",
                  });
                }
              });
            }
          }
        );
      }
    }
  );
  //}
};

exports.homepage = (req, res) => {
  console.log(req.body);

  //const { email_username, password } = req.body;
};

exports.chessgame = (req, res) => {
  console.log(req.body);
};
