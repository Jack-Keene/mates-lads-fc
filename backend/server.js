import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// import fixtureRoutes from "./routes/fixtureRoutes.js";
import altFixtureRoutes from "./routes/altFixtureRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import leagueRoutes from "./routes/leagueRoutes.js";
// import teamRoutes from "./routes/teamRoutes.js";
import altTeamRoutes from "./routes/altTeamRoutes.js";
// import leagueTableRoutes from "./routes/leagueTableRoutes.js";
import altLeagueTableRoutes from "./routes/altLeagueTableRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("M/L Api is running");
});

app.use("/api/fixtures", altFixtureRoutes);

app.use("/api/stats", statsRoutes);

app.use("/api/players", playerRoutes);

app.use("/api/leagues", leagueRoutes);

app.use("/api/leagueTable", altLeagueTableRoutes);

app.use("/api/teams", altTeamRoutes);

// app.use("/api/altteams", altTeamRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
);
