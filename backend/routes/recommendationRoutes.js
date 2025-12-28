import express from "express";
import { recommendFunds } from "../controllers/recommendationController.js";

const router = express.Router();
router.post("/", recommendFunds);

export default router;
