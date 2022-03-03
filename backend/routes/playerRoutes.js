import express from "express";
import {
  getPlayerById,
  getPlayers,
  authUser,
  registerPlayer,
  updatePlayerProfile,
} from "../controllers/playerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/").get(getPlayers);
router.route("/").post(registerPlayer);
router.route("/profile").get(getPlayerById).put(protect, updatePlayerProfile);
router.route("/:id").get(getPlayerById);

export default router;
