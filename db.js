var mongoose = require("mongoose");
var conn = mongoose.connect(process.env.DB_URL, { useMongoClient: true }, function(err) {
  if (err) {
    console.log("Mongo Error:");
    console.log(err);
  } else {
    console.log("MongoDB Connect is Successful!:");
  }
});
