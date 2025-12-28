import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";

const router = express.Router();

// Get all watchlist items
router.get("/", getWatchlist);

// Add a fund to watchlist
router.post("/add", addToWatchlist);

// Remove fund from watchlist
router.delete("/:id", removeFromWatchlist);

export default router;
