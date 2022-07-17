import AltTeam from "../models/altTeamModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create new team
// @route   POST api/teams
// @access  Public
const createTeam = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const teamExists = await AltTeam.findOne({ name: name });

  if (teamExists) {
    res.status(400);
    throw new Error("Team name already exists");
  }

  const team = await AltTeam.create({
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

// @desc    Fetch all teams
// @route   GET api/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
  const teams = await AltTeam.find({});
  res.json(teams);
});

const getTeamById = asyncHandler(async (req, res) => {
  const team = await AltTeam.findById(req.params.id).populate(
    "players",
    "firstName lastName number position"
  );

  res.json(team);
});

// @desc    Update team
// @route   POST api/teams/:id
// @access  Public
const updateTeamById = asyncHandler(async (req, res) => {
  const team = await AltTeam.findById(req.params.id);

  if (team) {
    team.players = req.body.players || team.players;
    team.name = req.body.name || team.name;

    const updatedTeam = await team.save();

    res.json({
      _id: updatedTeam._id,
      name: updatedTeam.name,
      players: updatedTeam.players,
    });
  }
});

export { createTeam, updateTeamById, getTeams, getTeamById };
