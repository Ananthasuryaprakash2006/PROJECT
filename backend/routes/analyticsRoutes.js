import express from "express";
import {
  getTopPerformers,
  getLowRiskFunds,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/top", getTopPerformers);
router.get("/low-risk", getLowRiskFunds);

export default router;
