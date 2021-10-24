const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
//const db = require("./database");
//const db = require("database");
//const session = require("./session");

var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "checkmate",

  //   // createDatabaseTable: false,
  //   // schema: {
  //   //         tableName: "session",
  //   //         columnNames: {
  //   //           session_id: "session_id",
  //   //           expires: "expires",
  //   //           data: "data",
  //   //         },
  //   //       }
};
//var sessionStore = new MySQLStore(options);
var connection = mysql.createConnection(options);
var sessionStore = new MySQLStore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "session",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  connection
);

dotenv.config({
  path: "./.env",
});

const app = express();
// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
// });

//* Static Folder
//app.use(express.static(path.join(__dirname, "public")));
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(
  session({
    key: "keyin",
    secret: "keyboard cat",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
//app.use(session);

//* Parse URL-encoded bodies (as sent by HTML forms)
app.use(
  express.urlencoded({
    extended: false,
  })
);
//* Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.set("view engine", "hbs");

// db.connect((error) => {
//   if (error) console.log(error);
//   else console.log("Xampp Connected...");
// });

//*Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

// app.get("/", (req, res) => {
//   // res.send("<h1>Home Page</h1>")
//   res.render('index')
// })
// app.get("/chess-master", (req, res) => {
//   // res.send("<h1>Home Page</h1>")
//   res.render('./chess-master/index')
// })

//************ for check session ***********************/
// const user = {
//   name: 'Md Asfakur Rahat',
//   id: 'rahat',
//   pass: 12345
// }

// app.get('/login', (req, res) => {
//   const {
//     id,
//     pass
//   } = req.body;
//   if (id != user.id || pass != user.pass) {
//     return res.status(401).json({
//       error: true,
//       message: 'Wrong username or pass'
//     })
//   } else {
//     req.session.userinfo = user.name
//     res.send("Login successful")
//   }
// })
// app.get('/', (req, res) => {
//   if (req.session.userinfo) {
//     res.send("Hello" + req.session.userinfo + "welcome")
//   } else {
//     res.send('Not logged in')
//   }
// })

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
