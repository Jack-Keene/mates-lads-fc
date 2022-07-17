import { AltTableRow } from "../models/altLeagueTableRowModel.js";
import asyncHandler from "express-async-handler";
import { League } from "../models/leagueModel.js";

// @desc    Create new league table row
// @route   POST api/leagues
// @access  Public
const createLeagueRow = asyncHandler(async (req, res) => {
  const { team, leagueId } = req.body;

  const leagueRow = await AltTableRow.create({
    team,
    league: leagueId,
  });

  if (leagueRow) {
    League.updateOne(
      { _id: leagueId },
      {
        $push: {
          table: { leagueRow },
        },
      }
    );

    const updatedLeagueRow = await AltTableRow.findById(leagueRow._id).populate(
      "team",
      "name"
    );
    res.status(201).json(updatedLeagueRow);
  } else {
    res.status(400);
    throw new Error("Invalid league row data");
  }
});
// @desc    Delete league table row
// @route   POST api/leagues
// @access  Public
const deleteLeagueRow = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  await AltTableRow.deleteOne({ _id: _id });
  await League.updateMany({}, { $pull: { table: { _id: _id } } });

  res.status(200).json({ _id: _id });
});

// @desc    Fetch all leagues table rows
// @route   GET api/leagueTable
// @access  Public
const getLeagueRows = asyncHandler(async (req, res) => {
  const leagueRows = await AltTableRow.find({})
    .populate("team", "name")
    .populate("league", "name");
  res.json(leagueRows);
});

export { createLeagueRow, getLeagueRows, deleteLeagueRow };
