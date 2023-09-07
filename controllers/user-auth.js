const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Successfully registered" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  if (user.blocked) {
    return res
      .status(StatusCodes.BadRequestError)
      .json({ message: "User blocked. Cannot log in" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ message: "Logged in", user, token });
};

const updateUser = async (req, res) => {
  let { name, email, password } = req.body;
  const userId = req.params.id;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, password } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  updateUser,
  login,
};
