import express from "express";
import {
  createLostItem,
  deleteLostItem,
  updateLostItem,
  getLostItem,
  getLostItems,
} from "../controllers/lostitemcontroller.js";
import { verifytoken } from "../utils/verifyuser.js";

const lostrouter = express.Router();

lostrouter.post("/create", verifytoken, createLostItem);
lostrouter.delete("/delete/:id", verifytoken, deleteLostItem);
lostrouter.post("/update/:id", verifytoken, updateLostItem);
lostrouter.get("/get/:id", getLostItem);
lostrouter.get("/get", getLostItems);

export default lostrouter;
