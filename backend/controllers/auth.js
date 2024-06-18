const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { Validator } = require("../helper/validator");
const { User } = require("../models/user");

dotenv.config();

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneAccessToken } = req.body;

  const { isInputValid, msg: inputValidationErrorMsg } =
    Validator.inputValidation({
      firstName,
      lastName,
      email,
      password,
      phoneAccessToken,
    });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationErrorMsg });
  }

  var { msg, isNewUserEntry } = await Validator.getUser(email, {
    attempt: "signup",
  });
  if (!isNewUserEntry) {
    return res.status(400).json({ msg });
  }

  const { phone_number } = jwt.decode(phoneAccessToken);
  var { msg, isNewUserEntry } = await Validator.getUserByPhoneNumber(
    phone_number,
    {
      attempt: "signup",
    }
  );
  if (!isNewUserEntry) {
    return res.status(400).json({ msg });
  }

  try {
    const newUser = new User({
      fullName: firstName + " " + lastName,
      email,
      password: bcrypt.hashSync(password.toString(), 4),
      phone: phone_number,
    });

    await newUser.save();
    return res.status(200).json({ msg: "Account created Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { isInputValid, msg: inputValidationMessage } =
    Validator.inputValidation({
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

const loginUserWithOtp = async (req, res) => {
  const { phoneAccessToken } = req.body;
  const { isInputValid, msg: inputValidationMessage } =
    Validator.inputValidation({ phoneAccessToken });
  if (!isInputValid) {
    return res.status(400).json({ msg: inputValidationMessage });
  }

  const { phone_number } = jwt.decode(phoneAccessToken);
  var { msg, isNewUserEntry, userData } = await Validator.getUserByPhoneNumber(
    phone_number,
    {
      attempt: "login",
    }
  );
  if (isNewUserEntry) {
    return res.status(400).json({ msg });
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
  loginUserWithOtp
};
