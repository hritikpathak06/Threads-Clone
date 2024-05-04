const express = require("express");
require("colors");
require("dotenv").config();
require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const app = express();
const path = require("path");


// Midllewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:"100mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"100mb"}));

// Routes Config
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

// Test Api
// app.get("/", (req, res) => {
//   res.send("Server Working on ");
// });


// *********************************************************Deployement*********************************************************
const dirname1 = path.resolve();
app.use(express.static(path.join(dirname1,"/frontend/dist")));
app.get("*",(req,res) => {
  res.sendFile(path.resolve(dirname1,"frontend","dist","index.html"))
})
// *********************************************************Deployement*********************************************************


const port = process.env.PORT || 10000;

// Port

app.listen(port, () => {
  console.log(`Server is running successfully on the port: ${port}`.red);
});
