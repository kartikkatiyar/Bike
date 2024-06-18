const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { Validator } = require("../helper/validator");
const { User } = require("../models/user");

dotenv.config();

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const { isInputValid, msg: inputValidationErrorMsg } = Validator.inputValidation({
    firstName,
    lastName,
    email,
    password,
    phone,
  });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationErrorMsg });
  }
  const { msg, isNewUserEntry } = await Validator.getUser(email, {
    attempt: "signup",
  });
  if (!isNewUserEntry) {
    return res.status(400).json({ msg });
  }
  const newUser = new User({
    fullName: firstName + " " + lastName,
    email,
    password: bcrypt.hashSync(password.toString(), 4),
    phone,
  });

  try {
    await newUser.save();
    return res.status(200).json({ msg: "Account created Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { isInputValid, msg: inputValidationMessage } = Validator.inputValidation({
    email,
    password,
  });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationMessage });
  }
  const { userData, msg, isNewUserEntry } = await Validator.getUser(email, {
    attempt: "logIn",
  });
  if (isNewUserEntry) {
    return res.status(400).json({ msg });
  }
  const isPasswordValid = bcrypt.compareSync(
    password.toString(),
    userData.password.toString()
  );
  if (!isPasswordValid) {
    return res.status(400).json({ msg: "invalid password" });
  }
  const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
  userData.password = null;
  try {
    return res.status(200).json({
      userData,
      msg: "login successful",
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
