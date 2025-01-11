import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteTimeline,
  getTimeline,
  postTimeline,
} from "../controller/timelinecontroller.js";

const router = express.Router();

router.post("/addTimeline", isAuthenticated, postTimeline);
router.get("/getTimeline", getTimeline);

router.delete("/delete/:id", isAuthenticated, deleteTimeline);

export default router;
