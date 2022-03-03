import {
  LEAGUE_TABLE_REQUEST,
  LEAGUE_TABLE_SUCCESS,
  LEAGUE_TABLE_FAIL,
  LEAGUE_LIST_REQUEST,
  LEAGUE_LIST_SUCCESS,
  LEAGUE_LIST_FAIL,
  LEAGUE_CREATE_REQUEST,
  LEAGUE_CREATE_SUCCESS,
  LEAGUE_CREATE_FAIL,
  LEAGUE_UPDATE_REQUEST,
  LEAGUE_UPDATE_SUCCESS,
  LEAGUE_UPDATE_FAIL,
  LEAGUE_STATE_RESET,
} from "../constants/leagueConstants";

export const leagueListReducer = (state = { leagues: [] }, action) => {
  switch (action.type) {
    case LEAGUE_LIST_REQUEST:
      return { loading: true, leagues: [] };
    case LEAGUE_LIST_SUCCESS:
      return { loading: false, leagues: action.payload };
    case LEAGUE_LIST_FAIL:
      return { loading: false, leagues: action.payload };
    default:
      return state;
  }
};

export const leagueTableReducer = (state = { league: {} }, action) => {
  switch (action.type) {
    case LEAGUE_TABLE_REQUEST:
      return { loading: true, ...state };
    case LEAGUE_TABLE_SUCCESS:
      return { loading: false, league: action.payload };
    case LEAGUE_TABLE_FAIL:
      return { loading: false, league: action.payload };
    default:
      return state;
  }
};

export const leagueCreateReducer = (state = { league: {} }, action) => {
  switch (action.type) {
    case LEAGUE_CREATE_REQUEST:
      return { loading: true, ...state };
    case LEAGUE_CREATE_SUCCESS:
      return { loading: false, success: true, league: action.payload };
    case LEAGUE_CREATE_FAIL:
      return { loading: false, league: action.payload };
    default:
      return state;
  }
};

export const leagueUpdateReducer = (state = { league: {} }, action) => {
  switch (action.type) {
    case LEAGUE_UPDATE_REQUEST:
      return { loading: true, ...state };
    case LEAGUE_UPDATE_SUCCESS:
      return { loading: false, success: true, league: action.payload };
    case LEAGUE_UPDATE_FAIL:
      return { loading: false, league: action.payload };
    case LEAGUE_STATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
