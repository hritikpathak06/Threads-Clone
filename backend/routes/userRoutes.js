const express = require("express");
const { registerUser, getAllUsers, deleteUser, loginUser, logoutUser } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/all").get(isAuthenticated, getAllUsers);

router.route("/logout").post(isAuthenticated,logoutUser);



router.route("/:id").delete(deleteUser)

module.exports = router;
