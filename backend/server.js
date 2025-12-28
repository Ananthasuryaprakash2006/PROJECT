import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import chatRoutes from "./routes/chatRoutes.js";

// ------------------------------
// INIT
// ------------------------------

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", chatRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON file
const loadFunds = () =>
  JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", "funds.json"), "utf-8")
  );

// Attach loader to request
app.use((req, res, next) => {
  req.loadFunds = loadFunds;
  next();
});

// ------------------------------
// ROUTES
// ------------------------------
import fundRoutes from "./routes/fundRoutes.js";
import compareRoutes from "./routes/compareRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

app.use("/api/funds", fundRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/watchlist", watchlistRoutes);

// ------------------------------
// SERVER
// ------------------------------

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running at http://localhost:${PORT}`)
);
