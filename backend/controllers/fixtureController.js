import Fixture from "../models/fixtureModel.js";
import asyncHandler from "express-async-handler";
import { League } from "../models/leagueModel.js";
import { Team } from "../models/teamModel.js";
import { TableRow } from "../models/leagueTableRowModel.js";

// @desc    Add fixture
// @route   POST api/fixtures
// @access  Public
const createFixture = asyncHandler(async (req, res) => {
  const { leagueId, homeTeamName, awayTeamName, date } = req.body;

  const league = await League.findById(leagueId);
  const homeTeam = await Team.findOne({ name: homeTeamName });
  const awayTeam = await Team.findOne({ name: awayTeamName });
  const parseDate = new Date(date);

  const fixture = await Fixture.create({
    league,
    homeTeam,
    awayTeam,
    date: parseDate,
  });

  if (fixture) {
    res.status(201).json({
      _id: fixture._id,
      homeTeam: fixture.homeTeam,
      awayTeam: fixture.awayTeam,
      date: fixture.date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid fixture data");
  }
});

// @desc    Update fixture
// @route   PUT api/fixtures/:id
// @access  Public
const updateFixtureById = asyncHandler(async (req, res) => {
  const fixture = await Fixture.findById(req.params.id);
  const {
    league: { _id },
    isPlayed,
  } = req.body;

  if (isPlayed) {
    const homeTableRow = await TableRow.findOneAndUpdate(
      {
        "team.name": fixture.homeTeam.name,
        league: _id,
      },
      {
        $inc: {
          played: 1,
          points:
            Number(req.body.homeGoals) > Number(req.body.awayGoals)
              ? 3
              : Number(req.body.homeGoals) > Number(req.body.awayGoals)
              ? 1
              : 0,
          won: Number(req.body.homeGoals) > Number(req.body.awayGoals) ? 1 : 0,
          lost: Number(req.body.homeGoals) < Number(req.body.awayGoals) ? 1 : 0,
          drawn:
            Number(req.body.homeGoals) === Number(req.body.awayGoals) ? 1 : 0,
          for: Number(req.body.homeGoals),
          against: Number(req.body.awayGoals),
          goalDifference:
            Number(req.body.homeGoals) - Number(req.body.awayGoals),
        },
      }
    );
    const awayTableRow = await TableRow.findOneAndUpdate(
      {
        "team.name": fixture.awayTeam.name,
        league: _id,
      },
      {
        $inc: {
          played: 1,
          points:
            Number(req.body.awayGoals) > Number(req.body.homeGoals)
              ? 3
              : Number(req.body.awayGoals) > Number(req.body.homeGoals)
              ? 1
              : 0,
          won: Number(req.body.awayGoals) > Number(req.body.homeGoals) ? 1 : 0,
          lost: Number(req.body.awayGoals) < Number(req.body.homeGoals) ? 1 : 0,
          drawn:
            Number(req.body.homeGoals) === Number(req.body.awayGoals) ? 1 : 0,
          for: Number(req.body.awayGoals),
          against: Number(req.body.homeGoals),
          goalDifference:
            Number(req.body.awayGoals) - Number(req.body.homeGoals),
        },
      }
    );

    const table = await TableRow.find({
      "table.league._id": homeTableRow.league._id,
    });

    console.log(table);

    await League.findOneAndUpdate(
      { _id: homeTableRow.league._id },
      {
        $set: {
          table: table,
        },
      }
    );
  }

  if (fixture) {
    fixture.league = req.body.league || fixture.league;
    fixture.homeTeam = req.body.homeTeam || fixture.homeTeam;
    fixture.awayTeam = req.body.awayTeam || fixture.awayTeam;
    fixture.homeGoals = req.body.homeGoals || fixture.homeGoals;
    fixture.awayGoals = req.body.awayGoals || fixture.awayGoals;
    fixture.date = req.body.date || fixture.date;
    fixture.isPlayed = req.body.isPlayed;
    fixture.stats = req.body.stats || fixture.stats;

    const updatedFixture = await fixture.save();

    res.json({
      _id: updatedFixture._id,
      league: updatedFixture.league,
      homeTeam: updatedFixture.homeTeam,
      awayTeam: updatedFixture.awayTeam,
      date: updatedFixture.date,
      homeGoals: updatedFixture.homeGoals,
      awayGoals: updatedFixture.awayGoals,
      isPlayed: updatedFixture.isPlayed,
    });
  } else {
    res.status(404);
    throw new Error("Fixture not found");
  }
});

// @desc    Fetch all fixtures
// @route   GET api/fixtures
// @access  Public
const getFixtures = asyncHandler(async (req, res) => {
  const fixtures = await Fixture.find({});
  res.json(fixtures);
});

// @desc    Fetch single fixture
// @route   GET api/fixtures/:id
// @access  Public
const getFixtureById = asyncHandler(async (req, res) => {
  const fixture = await Fixture.findById(req.params.id);

  if (fixture) {
    res.json(fixture);
  } else {
    res.status(404).json({ message: "Fixture not found" });
  }
});

export { getFixtures, getFixtureById, createFixture, updateFixtureById };
