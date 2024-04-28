const express = require("express");
require("colors");
require("dotenv").config();
require("./database/connection")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes");
const app = express();


// Middlewares
app.use(express.json({limit:"100mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"100mb"}));
app.use(cookieParser());


// Routes Config
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/post",postRoutes);


// Test Api
app.get("/",(req,res) => {
  res.send("Server Working on ")
})

const port = process.env.PORT || 10000;

// Port

app.listen(port,() => {
  console.log(`Server is running successfully on the port: ${port}`.red)
})