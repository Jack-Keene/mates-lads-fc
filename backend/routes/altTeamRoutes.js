import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
} from "../controllers/altTeamController.js";

const router = express.Router();

router.route("/").post(createTeam);
router.route("/").get(getTeams);
router.route("/:id").get(getTeamById);
// router.route("/:id").put(protect, admin, updateTeamById);

export default router;
