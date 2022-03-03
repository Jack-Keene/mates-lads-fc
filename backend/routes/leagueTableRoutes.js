import express from "express";
import {
  createLeagueRow,
  deleteLeagueRow,
  getLeagueRows,
} from "../controllers/leagueTableController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createLeagueRow);
router.route("/").get(getLeagueRows);
router.route("/").delete(protect, admin, deleteLeagueRow);

export default router;
