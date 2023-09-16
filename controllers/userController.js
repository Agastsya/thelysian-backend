import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";

//Gets User ID
export const getUserID = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(404).json({
        success: false,
        message: "Log In First",
      });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    res.json({
      success: true,
      message: "User Account Exists",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userStatus = await User.findOne({ email });
    if (userStatus)
      return res
        .status(404)
        .json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Successfully", 200);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    sendCookie(user, res, `Welcome Back, ${user.name}`, 201);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
};

export const purgeUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.deleteOne();
    res.json({
      success: true,
      message: "Deleted the user",
    });
  } catch (error) {}
};
