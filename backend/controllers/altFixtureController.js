import AltFixture from "../models/altFixtureModel.js";
import { AltTableRow } from "../models/altLeagueTableRowModel.js";
import { League } from "../models/leagueModel.js";
import asyncHandler from "express-async-handler";

// @desc    Add fixture
// @route   POST api/fixtures
// @access  Public
const createFixture = asyncHandler(async (req, res) => {
  const { leagueId, homeTeam, awayTeam, date } = req.body;

  const parseDate = new Date(date);

  const fixture = await AltFixture.create({
    league: leagueId,
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
  const fixture = await AltFixture.findById(req.params.id)
    .populate("homeTeam", "name")
    .populate("awayTeam", "name");

  const {
    isPlayed,
    league: { _id },
  } = req.body;
  // console.log(fixture);
  if (isPlayed) {
    const homeFixtures = await AltFixture.find({
      homeTeam: fixture.homeTeam._id,
      isPlayed: true,
      league: _id,
    });
    const awayFixtures = await AltFixture.find({
      awayTeam: fixture.homeTeam._id,
      isPlayed: true,
      league: _id,
    });

    const homePoints = homeFixtures.reduce(
      (acc, curr) =>
        curr.homeGoals > curr.awayGoals
          ? acc + 3
          : curr.homeGoals === curr.awayGoals
          ? acc + 1
          : acc,
      0
    );
    const awayPoints = awayFixtures.reduce(
      (acc, curr) =>
        curr.homeGoals < curr.awayGoals
          ? acc + 3
          : curr.homeGoals === curr.awayGoals
          ? acc + 1
          : acc,
      0
    );

    const homeTableRow = await AltTableRow.findOneAndUpdate(
      {
        team: fixture.homeTeam._id,
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

    const awayTableRow = await AltTableRow.findOneAndUpdate(
      {
        team: fixture.awayTeam._id,
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

    const table = await AltTableRow.find({
      "table.league._id": homeTableRow.league._id,
    });

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
  const fixtures = await AltFixture.find({})
    .sort({ date: -1 })
    .populate("league", "name venue")
    .populate("homeTeam", "name")
    .populate("awayTeam", "name");
  res.json(fixtures);
});

// @desc    Fetch single fixture
// @route   GET api/fixtures/:id
// @access  Public
const getFixtureById = asyncHandler(async (req, res) => {
  const fixture = await AltFixture.findById(req.params.id)
    .populate("league", "name venue")
    .populate("homeTeam", "name players")
    .populate("awayTeam", "name players")
    .populate({
      path: "homeTeam",
      populate: {
        path: "players",
        model: "Player",
      },
    })
    .populate({
      path: "awayTeam",
      populate: {
        path: "players",
        model: "Player",
      },
    });
  if (fixture) {
    res.json(fixture);
  } else {
    res.status(404).json({ message: "Fixture not found" });
  }
});

export { getFixtures, getFixtureById, createFixture, updateFixtureById };
