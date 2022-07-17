import { Player } from "../models/playerModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc    Auth player and get token
// @route   POST api/players/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const player = await Player.findOne({ username: username });
  if (player && (await player.matchPassword(password))) {
    res.json({
      _id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      username: player.username,
      isAdmin: player.isAdmin,
      image: player.image,
      position: player.position,
      number: player.number,
      stats: player.stats,
      team: player.team,
      token: generateToken(player.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid login details");
  }
});

// @desc    Register a new player
// @route   POST api/players
// @access  Public
const registerPlayer = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const playerExists = await Player.findOne({ username: username });
  if (playerExists) {
    res.status(400);
    throw new Error("Player already exists");
  }

  const player = await Player.create({
    firstName,
    lastName,
    username,
    password,
  });

  if (player) {
    res.status(201).json({
      _id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      username: player.username,
      isAdmin: player.isAdmin,
      image: player.image,
      position: player.position,
      number: player.number,
      stats: player.stats,
      team: player.team,
      token: generateToken(player.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid player data");
  }
});

// @desc    Fetch all players
// @route   GET api/players
// @access  Public
const getPlayers = asyncHandler(async (req, res) => {
  const players = await Player.find({});
  res.json(players);
});

// @desc    Fetch single player
// @route   GET api/players/:id
// @access  Public
const getPlayerById = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);

  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});

const updatePlayerProfile = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.body.id);

  if (player) {
    player.firstName = req.body.firstName || player.firstName;
    player.lastName = req.body.lastName || player.lastName;
    player.number = req.body.number || player.number;
    player.position = req.body.position || player.position;

    if (req.body.password) {
      player.password = req.body.password;
    }

    const updatedPlayer = await player.save();

    res.json(updatedPlayer);
  } else {
    res.status(404);
    throw new Error("Not found");
  }
});
export {
  getPlayers,
  getPlayerById,
  authUser,
  registerPlayer,
  updatePlayerProfile,
};
