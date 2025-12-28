import express from "express";
import {
  compareFunds,
  getQuadrantData,
} from "../controllers/compareController.js";

const router = express.Router();

router.post("/", compareFunds);
router.get("/quadrant", getQuadrantData);

export default router;
