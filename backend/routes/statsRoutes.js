import express from "express";
import { createStat, deleteStat } from "../controllers/statsController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, admin, createStat);
router.delete("/", protect, admin, deleteStat);

export default router;
