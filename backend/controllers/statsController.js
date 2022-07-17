import { Stat } from "../models/statsModel.js";
import asyncHandler from "express-async-handler";
import { Player } from "../models/playerModel.js";
// import Fixture from "../models/fixtureModel.js";
import AltFixture from "../models/altFixtureModel.js";
import AltTeam from "../models/altTeamModel.js";
import { AltTableRow } from "../models/altLeagueTableRowModel.js";
// import { League } from "../models/leagueModel.js";

// @desc    Add Stat
// @route   POST api/fixtures
// @access  Public
const createStat = asyncHandler(async (req, res) => {
  const { _id, stat, home, fixtureId } = req.body;

  let player = await Player.findById(_id);

  const newStat = await Stat.create({
    stat: stat,
    player: _id,
    playerName: player.firstName + " " + player.lastName,
    home: home,
    fixture: fixtureId,
  });

  await AltFixture.updateOne(
    { _id: fixtureId },
    {
      $push: {
        stats: {
          _id: newStat._id,
          stat: newStat.stat,
          player: newStat.player,
          playerName: newStat.playerName,
          home: newStat.home,
          fixture: newStat.fixture,
        },
      },
    }
  );

  await Player.updateOne(
    { _id: newStat.player },
    {
      $push: {
        stats: {
          _id: newStat._id,
          stat: newStat.stat,
          player: newStat.player,
          playerName: newStat.playerName,
          home: newStat.home,
          fixture: newStat.fixture,
        },
      },
    }
  );

  if (newStat) {
    res.status(201).json({
      _id: newStat._id,
      stat: newStat.stat,
      player: newStat.player,
      playerName: newStat.playerName,
      home: newStat.home,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Stat");
  }
});

const deleteStat = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  const stat = await Stat.findById(_id);
  console.log(stat);
  const { player } = stat;

  await Stat.deleteOne({ _id });
  await AltFixture.updateMany({}, { $pull: { stats: { _id: _id } } });
  await Player.updateMany({}, { $pull: { stats: { _id: _id } } });

  const playerObj = await Player.findOne({ _id: player });

  res.status(201).json({ _id: _id });
});

const getStats = asyncHandler(async (req, res) => {
  const stats = await Stat.find({})
    .populate("player", "firstName lastName position number")
    .populate("fixture", "league");
  res.json(stats);
});
export { createStat, deleteStat, getStats };
