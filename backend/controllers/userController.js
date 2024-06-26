const { default: mongoose } = require("mongoose");
const User = require("../schemas/userSchema");
const cloudinary = require("cloudinary");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, username, password, profilePic } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(402).json({
        success: false,
        message: "Please Fill Out All The Fields",
      });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const myCloud = await cloudinary.v2.uploader.upload(profilePic, {
      folder: "profile_images",
    });

    const user = new User({
      name,
      email,
      password,
      username,
      profilePic: myCloud.secure_url,
    });
    await user.save();
    const token = await user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Account",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = await user.generateToken();
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 15 * 24 * 60 * 60 * 1000,
    //   secure:true,
    //   sameSite: "None",
    // });
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      success: true,
      message: "User Logged In Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      maxAge: 0,
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id.toString() === req.user._id.toString())
      return res.status(400).json({
        success: false,
        message: "You cannot follow/unfollow yourself",
      });

    const isFollowing = currentUser.followings.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { followings: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { followings: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password, bio, profilePic } = req.body;
    const user = await User.findById(req.user._id);
    if (req.params.id !== req.user._id.toString()) {
      return res.status({
        success: false,
        message: "You Can't Update Other Profile",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    if (profilePic) {
      const cloudData = await cloudinary.v2.uploader.upload(profilePic, {
        folder: "profile_images",
      });
      user.profilePic = cloudData.secure_url || user.profilePic;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { query } = req.params;
    let user;
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query });
    } else {
      user = await User.findOne({ username: query });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
