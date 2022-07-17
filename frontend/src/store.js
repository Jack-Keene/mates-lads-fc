import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  fixtureCreateReducer,
  fixtureDetailsReducer,
  fixtureListReducer,
  fixtureUpdateReducer,
} from "./reducers/fixtureReducers.js";
import {
  playerDetailsReducer,
  playerListReducer,
  playerLoginReducer,
  playerRegisterReducer,
} from "./reducers/playerReducers.js";
import {
  leagueCreateReducer,
  leagueListReducer,
  leagueTableReducer,
  leagueUpdateReducer,
} from "./reducers/leagueReducers.js";
import {
  teamListReducer,
  teamCreateReducer,
  teamDetailsReducer,
  teamUpdateReducer,
} from "./reducers/teamReducer.js";
import {
  leagueRowCreateReducer,
  leagueRowDeleteReducer,
} from "./reducers/leagueRowReducer.js";
import {
  statCreateReducer,
  statDeleteReducer,
  statListReducer,
} from "./reducers/statReducers.js";

const reducer = combineReducers({
  fixtureList: fixtureListReducer,
  fixtureDetails: fixtureDetailsReducer,
  fixtureCreate: fixtureCreateReducer,
  fixtureUpdate: fixtureUpdateReducer,
  playerList: playerListReducer,
  playerDetails: playerDetailsReducer,
  playerLogin: playerLoginReducer,
  playerRegister: playerRegisterReducer,
  leagueDetails: leagueTableReducer,
  leagueList: leagueListReducer,
  leagueCreate: leagueCreateReducer,
  leagueUpdate: leagueUpdateReducer,
  teamList: teamListReducer,
  teamDetails: teamDetailsReducer,
  teamUpdate: teamUpdateReducer,
  teamCreate: teamCreateReducer,
  leagueRowCreate: leagueRowCreateReducer,
  leagueRowDelete: leagueRowDeleteReducer,
  statCreate: statCreateReducer,
  statDelete: statDeleteReducer,
  statList: statListReducer,
});

const playerInfoFromStorage = localStorage.getItem("playerInfo")
  ? JSON.parse(localStorage.getItem("playerInfo"))
  : null;

const initialState = {
  playerLogin: {
    playerInfo: playerInfoFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
