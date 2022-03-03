import mongoose from "mongoose";
import { leagueTableRowSchema } from "./leagueTableRowModel.js";
import { teamSchema } from "./teamModel.js";

const leagueSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  table: [leagueTableRowSchema],
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const League = mongoose.model("League", leagueSchema);

export { leagueSchema, League };
