const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    id: user._id,
    iat: Math.floor(Date.now() / 1000),
  };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
  //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const token = createToken(user);
  res.status(200).json({ username, token });
};

const registerController = async (req, res) => {
  const { name, username, password } = req.body;
  const user = new User({ name, username, password });
  try {
    await user.save();
    res.json({ message: "Successfully registered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  loginController,
  registerController,
};
