import express from "express";
import { User } from "../models/user.js";
import {
  getAllUsers,
  getUserID,
  Register,
  purgeUser,
  Login,
  logout,
  getMyProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.get("/:id", isAuthenticated, getUserID);

router.post("/new", Register);

router.post("/login", Login);

router.post("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getMyProfile);

router.delete("/purgeuser/:id", purgeUser);
export default router;
