var express = require("express");
var app = express();
var db = require("./db");

console.log("App Seen!!");

var UserController = require("./user/UserController");
app.use("/users", UserController);

app.get("/", function(req, res) {
  var msg = `Hello World Challenge @ ${Date.now()}`;
  console.log(msg);
  res.send(msg);
});

module.exports = app;
