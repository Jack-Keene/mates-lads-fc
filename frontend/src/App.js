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
import EditTeamScreen from "./screens/EditTeamScreen";
import TeamListScreen from "./screens/TeamListScreen";
import FixtureListScreen from "./screens/FixtureListScreen";
import SetResultScreen from "./screens/SetResultScreen";
import Footer from "./components/Footer";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <Router>
      <Header />
      <>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/fixtures/:id' element={<ResultScreen />} />
          <Route path='/fixtures' element={<FixtureScreen />} />
          <Route path='/league' element={<LeaguesScreen />} />
          <Route path='/league/:id' element={<LeagueScreen />} />
          <Route path='/players' element={<PlayersScreen />} />
          <Route path='/players/:id' element={<PlayerScreen />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
          <Route path='/addFixture' element={<AddFixtureScreen />} />
          <Route path='/setResult' element={<FixtureListScreen />} />
          <Route path='/setResult/:id' element={<SetResultScreen />} />
          <Route path='/addTeam' element={<AddTeamScreen />} />
          <Route path='/editTeam' element={<TeamListScreen />} />
          <Route path='/editTeam/:id' element={<EditTeamScreen />} />
          <Route path='/addLeague' element={<AddLeagueScreen />} />
          <Route path='/editLeagues' element={<LeagueListScreen />} />
          <Route path='/editLeagues/:id' element={<EditLeagueScreen />} />
        </Routes>
      </>
      <Footer />
    </Router>
  );
}

export default App;
