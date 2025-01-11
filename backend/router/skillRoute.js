import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addSkill,
  deleteSkill,
  getAllSkill,
  updateSkill,
} from "../controller/skillController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addSkill);
router.get("/get", getAllSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
export default router;
