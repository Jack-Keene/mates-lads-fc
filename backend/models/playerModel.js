import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { statSchema } from "./statsModel.js";

const playerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
  },
  position: {
    type: String,
  },
  number: {
    type: String,
  },
  stats: [statSchema],
  team: { type: String },
});

playerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

playerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Player = mongoose.model("Player", playerSchema);

export { Player, playerSchema };
