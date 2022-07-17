import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
} from "../controllers/altTeamController.js";

const router = express.Router();

router.route("/").post(createTeam);
router.route("/").get(getTeams);
router.route("/:id").get(getTeamById);
router.route("/:id").put(updateTeamById);

export default router;
