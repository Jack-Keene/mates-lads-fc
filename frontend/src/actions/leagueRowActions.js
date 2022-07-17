import axios from "axios";
import {
  LEAGUE_ROW_CREATE_REQUEST,
  LEAGUE_ROW_CREATE_SUCCESS,
  LEAGUE_ROW_CREATE_FAIL,
  LEAGUE_ROW_REMOVE,
} from "../constants/leagueRowConstants";

export const createLeagueRow =
  (team, leagueId) => async (dispatch, getState) => {
    try {
      dispatch({ type: LEAGUE_ROW_CREATE_REQUEST });

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
        "/api/leagueTable",
        { team, leagueId },
        config
      );
      dispatch({ type: LEAGUE_ROW_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LEAGUE_ROW_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeLeagueRow = (_id) => async (dispatch, getState) => {
  const {
    playerLogin: { playerInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${playerInfo.token}`,
    },
  };
  try {
    await axios.delete("/api/leagueTable", { data: { _id: _id } }, config);
    dispatch({
      type: LEAGUE_ROW_REMOVE,
      payload: _id,
    });
  } catch (error) {
    throw new Error("Not deleted");
  }
};
