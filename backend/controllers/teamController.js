import { Team } from "../models/teamModel.js";
import asyncHandler from "express-async-handler";
import { League } from "../models/leagueModel.js";

// @desc    Create new team
// @route   POST api/teams
// @access  Public
const createTeam = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const teamExists = await Team.findOne({ name: name });

  if (teamExists) {
    res.status(400);
    throw new Error("Team name already exists");
  }

  const team = await Team.create({
    name: name,
  });

  if (team) {
    res.status(201).json({
      id: team._id,
      name: team.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid team data");
  }
});

// @desc    Update team
// @route   POST api/teams/:id
// @access  Public
const updateTeamById = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);

  if (team) {
    team.players = req.body.players || team.players;
    team.name = req.body.name || team.name;

    const updatedTeam = await team.save();
    await League.updateMany(
      {},
      {
        $set: {
          table: {
            team: {
              _id: req.params.id,
              name: updatedTeam.name,
              players: updatedTeam.players,
            },
          },
        },
      }
    );

    res.json({
      _id: updatedTeam._id,
      name: updatedTeam.name,
      players: updatedTeam.players,
    });
  }
});

// @desc    Fetch all teams
// @route   GET api/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({});
  res.json(teams);
});

// @desc    Fetch single team
// @route   GET api/teams/:id
// @access  Public
const getTeamById = asyncHandler(async (req, res) => {
  console.log(req.body);
  const team = await Team.findById(req.params.id);

  if (team) {
    res.json(team);
  } else {
    res.status(404).json({ message: "Team not found" });
  }
});

export { getTeams, getTeamById, createTeam, updateTeamById };
