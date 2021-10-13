var btn = document.getElementById("resend");
btn.onclick = function () {
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const user = JSON.parse(data.toString());
      db.query(
        "select email from login where email=?",
        [user.email],
        async (error, results) => {
          if (error) {
            console.log(error);
          } else {
            var digits = "0123456789";
            let OTP = "";
            for (let i = 0; i < 6; i++) {
              OTP += digits[Math.floor(Math.random() * 10)];
            }

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
        }
      );
    }
  });
};
