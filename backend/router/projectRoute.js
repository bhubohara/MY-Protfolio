import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  addNewProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  UpdateProject,
} from "../controller/projectcontroller.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.put("/update/:id", isAuthenticated, UpdateProject);
router.get("/get", getAllProjects);
router.get("/getsingle/:id", getSingleProject);
router.delete("/delete/:id", deleteProject);

export default router;
