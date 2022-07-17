import mongoose from "mongoose";

const statSchema = mongoose.Schema({
  stat: {
    type: String,
    required: true,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Player",
  },
  playerName: {
    type: String,
    required: true,
  },
  home: {
    type: Boolean,
    required: true,
  },
  fixture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AltFixture",
  },
});

const Stat = mongoose.model("Stat", statSchema);

export { Stat, statSchema };
