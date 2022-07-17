// import mongoose from "mongoose";
// import { teamSchema } from "./teamModel.js";

// const leagueTableRowSchema = mongoose.Schema({
//   team: teamSchema,
//   league: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "League",
//   },
//   points: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   played: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   won: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   lost: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   drawn: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   for: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   against: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   goalDifference: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// });

// const TableRow = mongoose.model("TableRow", leagueTableRowSchema);

// export { TableRow, leagueTableRowSchema };
