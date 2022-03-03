import {
  LEAGUE_ROW_CREATE_REQUEST,
  LEAGUE_ROW_CREATE_SUCCESS,
  LEAGUE_ROW_CREATE_FAIL,
  LEAGUE_ROW_REMOVE,
} from "../constants/leagueRowConstants";

export const leagueRowCreateReducer = (state = { row: {} }, action) => {
  switch (action.type) {
    case LEAGUE_ROW_CREATE_REQUEST:
      return { loading: true, ...state };
    case LEAGUE_ROW_CREATE_SUCCESS:
      return { loading: false, row: action.payload };
    case LEAGUE_ROW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const leagueRowDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAGUE_ROW_REMOVE:
      return { success: true };
    default:
      return state;
  }
};
