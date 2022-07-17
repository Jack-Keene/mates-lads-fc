import mongoose from "mongoose";
import { statSchema } from "./statsModel.js";

const fixtureSchema = mongoose.Schema({
  league: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "League",
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "AltTeam",
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "AltTeam",
  },
  homeGoals: {
    type: Number,
    required: true,
    default: 0,
  },
  awayGoals: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  isPlayed: {
    type: Boolean,
    required: true,
    default: false,
  },
  stats: [statSchema],
});

const AltFixture = mongoose.model("AltFixture", fixtureSchema);

export default AltFixture;
