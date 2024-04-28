const mongoose = require("mongoose");

const uri = process.env.MONGO_DB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Database Connected Successfully".blue))
  .catch((err) => console.log("Something Went wrong".bgRed));
