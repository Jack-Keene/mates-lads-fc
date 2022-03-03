import express from "express";
import {
  createLeague,
  getLeagueById,
  getLeagues,
  updateLeague,
} from "../controllers/leagueController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getLeagues);
router.route("/").post(protect, admin, createLeague);
router.route("/").put(protect, admin, updateLeague);
router.route("/:id").get(getLeagueById);

export default router;
