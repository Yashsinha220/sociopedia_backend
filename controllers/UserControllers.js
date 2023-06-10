const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const saltround = 10;

// usem model include here

const register = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      picturepath,
      friends,
      location,
      occuptaion,
    } = req.body;

    // let salt;

    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: passwordhash,
      picturepath,
      friends,
      location,
      occuptaion,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// logging in

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User doesnt exits" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Inavalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "somehardstring", {
      expiresIn: "24h",
    });
    console.log(token)
    return res.status(200).json({
      token: token,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user._id,
      picturepath: user.picturepath,
      friends: user.friends,
      location: user.location,
      occuptaion: user.occuptaion,
      viewedProfile: user.viewedProfile,
      impressions: user.impressions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { register, login };
