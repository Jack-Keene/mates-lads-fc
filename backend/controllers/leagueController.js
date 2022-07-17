import { League } from "../models/leagueModel.js";
// import Fixture from "../models/fixtureModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create new league
// @route   POST api/leagues
// @access  Public
const createLeague = asyncHandler(async (req, res) => {
  const { name, venue } = req.body;

  const leagueExists = await League.findOne({ name: name, venue: venue });
  if (leagueExists) {
    res.status(400);
    throw new Error("League already exists");
  }

  const league = await League.create({
    name,
    venue,
  });

  if (league) {
    res.status(201).json({
      _id: league._id,
      name: league.name,
      venue: league.venue,
    });
  } else {
    res.status(400);
    throw new Error("Invalid league data");
  }
});

// @desc    Update league
// @route   PUT api/leagues
// @access  Public
const updateLeague = asyncHandler(async (req, res) => {
  const league = await League.findById(req.body.id);

  if (league) {
    league.name = req.body.name || league.name;
    league.venue = req.body.venue || league.venue;
    league.isActive = req.body.isActive;
    league.table = req.body.table || league.table;

    const updatedLeague = await league.save();

    // await Fixture.updateMany(
    //   { "league._id": updatedLeague._id },
    //   {
    //     $set: {
    //       league: {
    //         _id: updatedLeague._id,
    //         name: updatedLeague.name,
    //         venue: updatedLeague.venue,
    //         table: updatedLeague.table,
    //         isActive: updatedLeague.isActive,
    //       },
    //     },
    //   }
    // );

    res.json({
      _id: updatedLeague._id,
      name: updatedLeague.name,
      venue: updatedLeague.venue,
      table: updatedLeague.table,
      isActive: updatedLeague.isActive,
    });
  } else {
    res.status(404);
    throw new Error("League not found");
  }
});

// @desc    Fetch all leagues
// @route   GET api/leagues
// @access  Public
const getLeagues = asyncHandler(async (req, res) => {
  const leagues = await League.find({}).populate({
    path: "table",
    populate: {
      path: "team",
      model: "AltTeam",
    },
  });
  res.json(leagues);
});

// @desc    Fetch single league
// @route   GET api/leagues/:id
// @access  Public
const getLeagueById = asyncHandler(async (req, res) => {
  const league = await League.findById(req.params.id)
    .populate({
      path: "table",
      model: "AltTableRow",
    })
    .populate({
      path: "table",
      populate: {
        path: "team",
        model: "AltTeam",
      },
    });
  //   populate: {
  //     path: "team",
  //     model: "AltTableRow",
  //   },
  //   populate: {
  //     path: "won",
  //     model: "AltTeam",
  //   },
  // });

  if (league) {
    res.json(league);
  } else {
    res.status(404).json({ message: "League not found" });
  }
});

export { getLeagues, getLeagueById, createLeague, updateLeague };
