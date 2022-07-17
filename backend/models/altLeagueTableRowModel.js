import mongoose from "mongoose";

const leagueTableRowSchema = mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AltTeam",
    required: true,
  },
  league: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "League",
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0,
  },
  played: {
    type: Number,
    required: true,
    default: 0,
  },
  won: {
    type: Number,
    required: true,
    default: 0,
  },
  lost: {
    type: Number,
    required: true,
    default: 0,
  },
  drawn: {
    type: Number,
    required: true,
    default: 0,
  },
  for: {
    type: Number,
    required: true,
    default: 0,
  },
  against: {
    type: Number,
    required: true,
    default: 0,
  },
  goalDifference: {
    type: Number,
    required: true,
    default: 0,
  },
});

const AltTableRow = mongoose.model("AltTableRow", leagueTableRowSchema);

export { AltTableRow, leagueTableRowSchema };
