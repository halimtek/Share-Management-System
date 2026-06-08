const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Shareholders = require("../model/share");
const Buyers = require("../model/buyshare");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "2d",
    }
  );
};

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and Password are required",
    });
  }

  let userExist = await Shareholders.findOne({ email });

  if (!userExist) {
    userExist = await Buyers.findOne({ email });
  }

  if (!userExist) {
    return res.status(404).json({
      error: "User Not Found",
    });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    userExist.password
  );

  if (!passwordMatch) {
    return res.status(400).json({
      error: "Invalid Credentials",
    });
  }

  return res.status(200).json({
    _id: userExist._id,
    email: userExist.email,
    firstname: userExist.firstname,
    lastname: userExist.lastname,
    middlename: userExist.middlename,
    phoneNo: userExist.phoneNo,
    roll: userExist.roll || 0,
    token: generateToken(userExist._id),
  });
});

module.exports = {
  LoginUser,
  generateToken,
};