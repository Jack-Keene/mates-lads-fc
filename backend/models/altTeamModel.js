import mongoose from "mongoose";

const altTeamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Player",
    },
  ],
});

const AltTeam = mongoose.model("AltTeam", altTeamSchema);

export default AltTeam;
