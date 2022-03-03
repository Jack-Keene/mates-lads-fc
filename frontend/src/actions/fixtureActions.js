import axios from "axios";
import {
  FIXTURE_LIST_REQUEST,
  FIXTURE_LIST_SUCCESS,
  FIXTURE_LIST_FAIL,
  FIXTURE_DETAILS_SUCCESS,
  FIXTURE_DETAILS_REQUEST,
  FIXTURE_DETAILS_FAIL,
  FIXTURE_CREATE_REQUEST,
  FIXTURE_CREATE_SUCCESS,
  FIXTURE_CREATE_FAIL,
  FIXTURE_UPDATE_REQUEST,
  FIXTURE_UPDATE_SUCCESS,
  FIXTURE_UPDATE_FAIL,
} from "../constants/fixtureConstants.js";

export const createFixture =
  (leagueId, homeTeamName, awayTeamName, date) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FIXTURE_CREATE_REQUEST });

      const {
        playerLogin: { playerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${playerInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/fixtures",
        { leagueId, homeTeamName, awayTeamName, date },
        config
      );

      console.log(data);

      dispatch({ type: FIXTURE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FIXTURE_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateFixture = (fixture) => async (dispatch, getState) => {
  try {
    dispatch({ type: FIXTURE_UPDATE_REQUEST });
    const {
      _id,
      league,
      homeTeam,
      awayTeam,
      homeGoals,
      awayGoals,
      date,
      isPlayed,
      stats,
    } = fixture;

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/fixtures/${_id}`,
      {
        _id,
        league,
        homeTeam,
        awayTeam,
        homeGoals,
        awayGoals,
        date,
        isPlayed,
        stats,
      },
      config
    );

    dispatch({ type: FIXTURE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FIXTURE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFixtures = () => async (dispatch) => {
  try {
    dispatch({ type: FIXTURE_LIST_REQUEST });

    const { data } = await axios.get("api/fixtures");
    dispatch({
      type: FIXTURE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIXTURE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listFixtureDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FIXTURE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/fixtures/${id}`);
    dispatch({
      type: FIXTURE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIXTURE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
