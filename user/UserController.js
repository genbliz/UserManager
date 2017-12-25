var express = require("express");
var router = express.Router();
var User = require("./user");

var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: "10mb" }));
router.use(
  bodyParser.json({
    type: "application/vnd.api+json",
    limit: "10mb",
  }),
);

// CREATES A NEW USER
function createUser(req, res) {
  var user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  console.log("Create User:");
  console.log(JSON.stringify(user));
  User.create(user, function(err, user) {
    if (err) return res.status(500).send("There was a problem adding the information to the database.");
    res.status(200).send(user);
  });
}

// RETURNS ALL THE USERS IN THE DATABASE
function getAllUsers(req, res) {
  User.find({}, function(err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
}

// GETS A SINGLE USER FROM THE DATABASE
function getUserById(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
}

// DELETES A USER FROM THE DATABASE
function removeUser(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User " + user.name + " was deleted.");
  });
}

// UPDATES A SINGLE USER IN THE DATABASE
function updateUser(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(user);
  });
}

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", removeUser);
router.put("/:id", updateUser);

module.exports = router;
