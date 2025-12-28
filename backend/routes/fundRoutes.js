import express from "express";
import { getFunds, getFundById } from "../controllers/fundController.js";

const router = express.Router();

router.get("/", getFunds);
router.get("/:id", getFundById);

export default router;
