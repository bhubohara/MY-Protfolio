import express from "express";
import {
  deleteMessage,
  getAllMessage,
  sendMessage,
} from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAllMessage", getAllMessage);

router.delete("/delete/:id", isAuthenticated, deleteMessage);

export default router;
