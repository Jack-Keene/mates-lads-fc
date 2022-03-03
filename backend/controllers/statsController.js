import { Stat } from "../models/statsModel.js";
import asyncHandler from "express-async-handler";
import { Player } from "../models/playerModel.js";
import Fixture from "../models/fixtureModel.js";
import { Team } from "../models/teamModel.js";
import { TableRow } from "../models/leagueTableRowModel.js";
import { League } from "../models/leagueModel.js";

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
  });

  const stats = await Stat.find({ player: _id });

  await Fixture.updateOne(
    { _id: fixtureId },
    {
      $push: {
        stats: {
          _id: newStat._id,
          stat: newStat.stat,
          player: newStat.player,
          playerName: newStat.playerName,
          home: newStat.home,
        },
      },
    }
  );

  await Player.updateOne(
    {},
    {
      _id: newStat.player,
      $push: {
        stats: {
          _id: newStat._id,
          stat: newStat.stat,
          player: newStat.player,
          playerName: newStat.playerName,
          home: newStat.home,
        },
      },
    }
  );
  await Team.updateMany(
    { "players._id": player._id },
    {
      $set: {
        "players.$.stats": stats,
      },
    }
  );

  // const leagueFind = await League.find({ "table.team.players._id": player._id });

  // console.log(leagueFind.table);
  // await League.updateMany(
  //   { "table.team.players._id": player },
  //   {
  //     $set: {
  //       "table.team.players.$.stats": stats,
  //     },
  //   }
  // );

  player = await Player.findById(_id);

  await TableRow.updateMany(
    { "team.players._id": player },
    {
      $set: {
        "team.players.$.stats": player.stats,
      },
    },
    { upsert: true }
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
  console.log(_id);

  const stat = await Stat.findById(_id);
  const { player } = stat;

  await Stat.deleteOne({ _id });
  await Fixture.updateMany({}, { $pull: { stats: { _id: _id } } });
  await Player.updateMany({}, { $pull: { stats: { _id: _id } } });

  const playerObj = await Player.findOne({ _id: player });

  await Team.updateMany(
    { "players._id": player },
    {
      $set: {
        "players.$.stats": playerObj.stats,
      },
    }
  );

  await TableRow.updateMany(
    { "team.players._id": player },
    {
      $set: {
        "team.players.$.stats": playerObj.stats,
      },
    }
  );

  res.status(201).json({ _id: _id });
});
export { createStat, deleteStat };
