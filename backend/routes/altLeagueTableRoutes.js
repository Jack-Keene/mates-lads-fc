import express from "express";
import {
  createLeagueRow,
  deleteLeagueRow,
  getLeagueRows,
} from "../controllers/altLeagueTableController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createLeagueRow);
router.route("/").get(getLeagueRows);
router.route("/").delete(deleteLeagueRow);

export default router;
