const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config({
  path: './.env'
});



const app = express()

//console.log(process.env)

// const db = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASS,
//   database: process.env.DBASE
// })

const publicDirectory = path.join(__dirname, './public');

app.use(express.static(publicDirectory));

app.set('view engine', 'hbs')

// db.connect((err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Database connected')
//   }
// })


//Define Router
app.use('/', require('./routes/pages'))

// app.get("/", (req, res) => {
//   // res.send("<h1>Home Page</h1>")
//   res.render('index')
// })
// app.get("/chess-master", (req, res) => {
//   // res.send("<h1>Home Page</h1>")
//   res.render('./chess-master/index')
// })

app.listen(5001, () => {
  console.log('Server started.')
})