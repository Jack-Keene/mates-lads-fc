import axios from "axios";
import {
  STAT_CREATE_REQUEST,
  STAT_CREATE_SUCCESS,
  STAT_CREATE_FAIL,
  STAT_DELETE_REQUEST,
  STAT_DELETE_SUCCESS,
  STAT_DELETE_FAIL,
} from "../constants/statsConstants.js";

export const createStat =
  (_id, stat, home, fixtureId) => async (dispatch, getState) => {
    try {
      dispatch({ type: STAT_CREATE_REQUEST });

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
        "/api/stats",
        { _id, stat, home, fixtureId },
        config
      );

      dispatch({
        type: STAT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: STAT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteStat = (_id) => async (dispatch) => {
  try {
    dispatch({ type: STAT_DELETE_REQUEST });
    await axios.delete("/api/stats", { data: { _id: _id } });

    dispatch({ type: STAT_DELETE_SUCCESS, success: true });
  } catch (error) {
    dispatch({ type: STAT_DELETE_FAIL });
    throw new Error("Not deleted");
  }
};
