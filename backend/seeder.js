import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import players from "./data/players.js";
import fixtures from "./data/fixtures.js";
import leagues from "./data/leagues.js";
import stats from "./data/stats.js";
import teams from "./data/teams.js";
import leagueTable from "./data/leagueTable.js";
import { Player } from "./models/playerModel.js";
import Fixture from "./models/fixtureModel.js";
import Stat from "./models/statsModel.js";
import { League } from "./models/leagueModel.js";
import { Team } from "./models/teamModel.js";
import connectDB from "./config/db.js";
import { TableRow } from "./models/leagueTableRowModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Player.deleteMany();
    await Team.deleteMany();
    await Fixture.deleteMany();
    await Stat.deleteMany();
    await League.deleteMany();
    await TableRow.deleteMany();

    const createdPlayers = await Player.insertMany(players);
    const sampleTeam = teams.map((team) => {
      return { ...team, players: createdPlayers };
    });

    const createdTeam = await Team.insertMany(sampleTeam);
    const homeTeam = createdTeam[0];
    const awayTeam = createdTeam[1];

    const sampleLeagueRows = leagueTable.map((row) => {
      return { ...row, team: homeTeam };
    });

    const createdLeagueTable = await TableRow.insertMany(sampleLeagueRows);

    const sampleLeague = leagues.map((league) => {
      return { ...league, table: createdLeagueTable };
    });
    const createdLeague = await League.insertMany(sampleLeague);
    const league1 = createdLeague[0];

    const sampleFixtures = fixtures.map((fixture) => {
      return { ...fixture, league: league1, homeTeam, awayTeam };
    });

    const createdFixture = await Fixture.insertMany(sampleFixtures);

    const player1 = createdPlayers[0]._id;
    const fixture1 = createdFixture[0]._id;

    const sampleStat = stats.map((stat) => {
      return { ...stat, player: player1, fixture: fixture1 };
    });

    await Stat.insertMany(sampleStat);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  process.exit();
} else {
  importData();
}
