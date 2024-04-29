const jwt = require("jsonwebtoken");
const User = require("../schemas/userSchema");


exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please Login To Continue",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Intarnal Server Error",
      error: error.message,
    });
  }
};
