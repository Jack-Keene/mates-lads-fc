// import { TableRow } from "../models/leagueTableRowModel.js";
// import asyncHandler from "express-async-handler";
// import { Team } from "../models/teamModel.js";
// import { League } from "../models/leagueModel.js";

// @desc    Create new league table row
// @route   POST api/leagues
// @access  Public
// const createLeagueRow = asyncHandler(async (req, res) => {
//   const { teamName, leagueId } = req.body;

//   const team = await Team.findOne({ name: teamName });

//   const leagueRow = await TableRow.create({
//     team,
//     league: leagueId,
//   });
//   if (leagueRow) {
//     res.status(201).json({
//       _id: leagueRow._id,
//       team: leagueRow.team,
//       league: leagueRow.league,
//       points: leagueRow.points,
//       played: leagueRow.played,
//       won: leagueRow.won,
//       lost: leagueRow.lost,
//       drawn: leagueRow.drawn,
//       for: leagueRow.for,
//       against: leagueRow.against,
//       goalDifference: leagueRow.goalDifference,
//       _v: leagueRow._v,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid league row data");
//   }
// });
// @desc    Delete league table row
// @route   POST api/leagues
// @access  Public
// const deleteLeagueRow = asyncHandler(async (req, res) => {
//   const { _id } = req.body;
//   await TableRow.deleteOne({ _id: _id });
//   await League.updateMany({}, { $pull: { table: { _id: _id } } });

//   res.status(200).json({ _id: _id });
// });

// @desc    Fetch all leagues table rows
// @route   GET api/leagueTable
// @access  Public
// const getLeagueRows = asyncHandler(async (req, res) => {
//   const leagueRows = await TableRow.find({});
//   res.json(leagueRows);
// });

// export { createLeagueRow, getLeagueRows, deleteLeagueRow };
