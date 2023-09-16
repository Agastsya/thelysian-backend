import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/all", async (req, res) => {
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
});

router.get("/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid);
    res.json({
      success: true,
      message: "User Account Exists",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    res.cookie("status", "temp").json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message,
    });
  }
});
export default router;
