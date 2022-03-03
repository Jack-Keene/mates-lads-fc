import axios from "axios";
import {
  TEAM_LIST_REQUEST,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_FAIL,
  TEAM_DETAILS_REQUEST,
  TEAM_DETAILS_SUCCESS,
  TEAM_DETAILS_FAIL,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_SUCCESS,
  TEAM_CREATE_FAIL,
  TEAM_UPDATE_REQUEST,
  TEAM_UPDATE_SUCCESS,
  TEAM_UPDATE_FAIL,
} from "../constants/teamConstants.js";

export const listTeams = () => async (dispatch) => {
  try {
    dispatch({ type: TEAM_LIST_REQUEST });

    const { data } = await axios.get("/api/teams");

    dispatch({
      type: TEAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTeam = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/teams/${id}`);

    dispatch({
      type: TEAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTeam = (name) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_CREATE_REQUEST });

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/teams", { name }, config);

    dispatch({
      type: TEAM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateTeam = (team) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_UPDATE_REQUEST }, config);

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };

    const { id, name, players } = team;
    const { data } = await axios.put(
      `/api/teams/${id}`,
      { name, players },
      config
    );

    dispatch({
      type: TEAM_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
