import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "../controller/contactController.js";

const router = express.Router();

router.post("/addContact", addContact);
router.put("/update/:id", isAuthenticated, updateContact);
router.delete("/delete/:id", isAuthenticated, deleteContact);
router.get("/getcontact", getAllContacts);
export default router;
