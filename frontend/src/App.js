import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import ResultScreen from "./screens/ResultScreen";
import LeagueScreen from "./screens/LeagueScreen";
import LeaguesScreen from "./screens/LeaguesScreen";
import PlayersScreen from "./screens/PlayersScreen";
import PlayerScreen from "./screens/PlayerScreen";
import FixtureScreen from "./screens/FixtureScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddFixtureScreen from "./screens/AddFixtureScreen";
import AdminScreen from "./screens/AdminScreen";
import AddLeagueScreen from "./screens/AddLeagueScreen";
import LeagueListScreen from "./screens/LeagueListScreen";
import EditLeagueScreen from "./screens/EditLeagueScreen";
import AddTeamScreen from "./screens/AddTeamScreen";
// import EditTeamScreen from "./screens/EditTeamScreen";
import EditTeamScreen from "./screens/newEditTeamScreen";
import TeamListScreen from "./screens/TeamListScreen";
import FixtureListScreen from "./screens/FixtureListScreen";
import SetResultScreen from "./screens/SetResultScreen";
import Footer from "./components/Footer";
import ProfileScreen from "./screens/ProfileScreen";
import FantasyLeagueScreen from "./screens/FantasyLeagueScreen";
import AddPlayerScreen from "./screens/AddPlayerScreen";
import PlayersListScreen from "./screens/PlayersListScreen";
import PlayerEditScreen from "./screens/PlayerEditScreen";

function App() {
  return (
    <Router>
      <Header />
      <>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/fixtures' element={<FixtureScreen />} />
          <Route path='/league' element={<LeaguesScreen />} />
          <Route path='/league/:id' element={<LeagueScreen />} />
          <Route path='/players' element={<PlayersScreen />} />
          <Route path='/players/:id' element={<PlayerScreen />} />
          <Route path='/players/league' element={<FantasyLeagueScreen />} />
          <Route path='/' element={<HomeScreen />} /> */ /*
          <Route path='/fixtures/:id' element={<ResultScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
          <Route path='/admin/fixtures' element={<FixtureListScreen />} />
          <Route path='/admin/fixtures/add' element={<AddFixtureScreen />} />
          <Route
            path='/admin/fixtures/:id/edit'
            element={<SetResultScreen />}
          />
          <Route path='/admin/leagues' element={<LeagueListScreen />} />
          <Route path='/admin/leagues/add' element={<AddLeagueScreen />} />
          <Route
            path='/admin/leagues/:id/edit'
            element={<EditLeagueScreen />}
          />
          <Route path='/admin/teams/add' element={<AddTeamScreen />} />
          <Route path='/admin/teams' element={<TeamListScreen />} />
          <Route path='/admin/teams/:id/edit' element={<EditTeamScreen />} />
          <Route path='/admin/players/add' element={<AddPlayerScreen />} />
          <Route path='/admin/players' element={<PlayersListScreen />} />
          <Route
            path='/admin/players/:id/edit'
            element={<PlayerEditScreen />}
          />
        </Routes>
      </>
      <Footer />
    </Router>
  );
}

export default App;
