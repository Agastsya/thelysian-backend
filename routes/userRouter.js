import express from "express";
import { User } from "../models/user.js";
import {
  getAllUsers,
  getUserID,
  Register,
  purgeUser,
  Login,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.get("/:id", getUserID);

router.post("/new", Register);

router.post("/login", Login);

router.delete("/purgeuser/:id", purgeUser);
export default router;
