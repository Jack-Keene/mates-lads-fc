import mongoose from "mongoose";
import { playerSchema } from "./playerModel.js";

const teamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  players: [playerSchema],
});

const Team = mongoose.model("Team", teamSchema);

export { Team, teamSchema };
