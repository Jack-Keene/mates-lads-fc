import express from "express";
import {
  createStat,
  deleteStat,
  getStats,
} from "../controllers/statsController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStats);
router.post("/", createStat);
router.delete("/", deleteStat);

export default router;
