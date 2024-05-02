const express = require("express");
const {
  registerUser,
  getAllUsers,
  deleteUser,
  loginUser,
  logoutUser,
  getMyProfile,
  followUnfollowUser,
  updateProfile,
  getUserProfile,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/logout").post(isAuthenticated, logoutUser);

router.route("/all").get(isAuthenticated, getAllUsers);

router.route("/follow/:id").post(isAuthenticated, followUnfollowUser);

router.route("/update/profile/:id").put(isAuthenticated, updateProfile);

router.route("/profile/:query").get(getUserProfile);

router.route("/:id").delete(deleteUser);

module.exports = router;
