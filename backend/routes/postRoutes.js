const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  createPost,
  getSinglePost,
  deletePost,
  getMyPost,
  likeUnlikePost,
  replyToPost,
  getFeedPost,
  getUserPost,
} = require("../controllers/postController");
const router = express.Router();

router.route("/create").post(isAuthenticated, createPost);

router.route("/myPost").get(isAuthenticated, getMyPost);

router.route("/feed").get(isAuthenticated, getFeedPost);


router.route("/replies/:postId").post(isAuthenticated, replyToPost);

router.route("/like/:postId").post(isAuthenticated, likeUnlikePost);

router.route("/:postId").get(getSinglePost).delete(isAuthenticated, deletePost);

router.route("/user/:username").get(getUserPost);
module.exports = router;
