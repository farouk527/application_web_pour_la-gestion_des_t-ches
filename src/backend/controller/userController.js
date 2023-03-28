const jwt = require('jsonwebtoken');
const User = require("../model/user");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(409).send("All input is required");
    } 
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const user = await User.create({
      email: email,
      password: password,
    });
    const token = jwt.sign(
      { user_id: user._id},
      "RANDOM-TOKEN",
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    await user.save(); 
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (password === user.password)) {
      const token = jwt.sign(
        { user_id: user._id, email },
        "RANDOM-TOKEN",
        {
          expiresIn: "1h",
        }
      );
      user.token = token;
      return res.status(200).json(user.token);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};


exports.auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], "RANDOM-TOKEN");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
