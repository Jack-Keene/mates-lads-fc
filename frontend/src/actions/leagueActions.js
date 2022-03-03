import axios from "axios";
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

export const createLeague = (name, venue) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAGUE_CREATE_REQUEST });

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/leagues", { name, venue }, config);

    dispatch({ type: LEAGUE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LEAGUE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLeague = (league) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAGUE_UPDATE_REQUEST });

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };

    const { data } = await axios.put("/api/leagues", league, config);

    dispatch({ type: LEAGUE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LEAGUE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetState = () => async (dispatch) => {
  dispatch({ type: LEAGUE_STATE_RESET });
};

export const listLeagues = () => async (dispatch) => {
  try {
    dispatch({ type: LEAGUE_LIST_REQUEST });

    const { data } = await axios.get("/api/leagues");

    dispatch({
      type: LEAGUE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAGUE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listLeagueDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LEAGUE_TABLE_REQUEST });

    const { data } = await axios.get(`/api/leagues/${id}`);
    dispatch({
      type: LEAGUE_TABLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LEAGUE_TABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
