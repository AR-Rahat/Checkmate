const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const dotenv = require("dotenv");

var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "checkmate",
};

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

session({
  key: "keyin",
  secret: "keyboard cat",
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});

module.exports = session;
