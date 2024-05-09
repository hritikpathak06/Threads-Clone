const Post = require("../schemas/postSchema");
const User = require("../schemas/userSchema");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(img, {
      folder: "thread_post",
    });
    const post = new Post({
      postedBy: req.user._id,
      text,
      img: myCloud.secure_url,
    });
    await post.save();
    return res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (post.postedBy._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You Can't Delete Other Posts",
      });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getMyPost = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.user._id }).sort({createdAt:-1})
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user",
      });
    }
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikedPost = post.likes?.includes(userId);

    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // Like post
      post.likes?.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const username = req.user.username;
    const userProfilePic = req.user.profilePic;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }
    if (!text) {
      return res.status(401).json({
        sucess: false,
        message: "Text Field Is Required",
      });
    }

    const data = { userId, text, username };

    post.replies.push(data);

    await post.save();

    return res.status(201).json({
      sucess: true,
      message: "Replies Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFeedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const followings = user.followings;

    const posts = await Post.find({ postedBy: { $in: followings } }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: false,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserPost = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const posts = await Post.find({ postedBy: user?._id }).sort({
      createAt: -1,
    });
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "No Post Found",
      });
    }
    return res.status(200).json({
      success: true,
      posts,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
