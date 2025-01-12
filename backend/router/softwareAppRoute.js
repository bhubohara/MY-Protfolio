import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addSoftwareApp,
  deleteSoftwareApp,
  getAllSoftwareApp,
  UpdatesoftwareApp,
} from "../controller/softwareAppController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addSoftwareApp);
router.put("/update/:id", isAuthenticated, UpdatesoftwareApp);
router.delete("/delete/:id", isAuthenticated, deleteSoftwareApp);
router.get("/getSoftware", getAllSoftwareApp);
export default router;
