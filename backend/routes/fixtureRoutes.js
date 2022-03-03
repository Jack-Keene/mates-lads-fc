import express from "express";
const router = express.Router();
import {
  getFixtures,
  getFixtureById,
  createFixture,
  updateFixtureById,
} from "../controllers/fixtureController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, admin, createFixture);
router.route("/").get(getFixtures);
router.route("/:id").get(getFixtureById).put(protect, admin, updateFixtureById);

export default router;
