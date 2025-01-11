import express from "express";
import {
  fogotPassword,
  getUser,
  getUserForProtfolio,
  login,
  logout,
  passwordReset,
  register,
  updatePassword,
  updateUserProfile,
} from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/Register", register);
router.post("/Login", login);
router.get("/me", isAuthenticated, getUser);
router.get("/Logout", isAuthenticated, logout);

router.put("/update/profile", isAuthenticated, updateUserProfile);

router.put("/update/password", isAuthenticated, updatePassword);
router.get("/myprofile", getUserForProtfolio);
router.post("/forgote/password", fogotPassword);
router.put("/password/reset/:token", passwordReset);

export default router;
