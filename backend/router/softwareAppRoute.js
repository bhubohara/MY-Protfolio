import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addSoftwareApp,
  deleteSoftwareApp,
  getAllSoftwareApp,
  UpdatesoftwareApp,
} from "../controller/softwareAppController.js";

const router = express.Router();

router.post("/add", addSoftwareApp);
router.put("/update/:id",  UpdatesoftwareApp);
router.delete("/delete/:id",  deleteSoftwareApp);
router.get("/getSoftware", getAllSoftwareApp);
export default router;
