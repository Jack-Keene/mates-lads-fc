import axios from "axios";
import {
  PLAYER_LIST_REQUEST,
  PLAYER_LIST_SUCCESS,
  PLAYER_LIST_FAIL,
  PLAYER_DETAILS_REQUEST,
  PLAYER_DETAILS_SUCCESS,
  PLAYER_DETAILS_FAIL,
  PLAYER_LOGIN_SUCCESS,
  PLAYER_LOGIN_FAIL,
  PLAYER_LOGIN_REQUEST,
  PLAYER_LOGOUT,
  PLAYER_REGISTER_REQUEST,
  PLAYER_REGISTER_FAIL,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_UPDATE_REQUEST,
  PLAYER_UPDATE_SUCCESS,
  PLAYER_UPDATE_FAIL,
} from "../constants/playerConstants.js";

export const logout = () => (dispatch) => {
  localStorage.removeItem("playerInfo");
  dispatch({ type: PLAYER_LOGOUT });
};

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: PLAYER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/players/login",
      { username, password },
      config
    );

    dispatch({
      type: PLAYER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("playerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PLAYER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (firstName, lastName, username, password) => async (dispatch) => {
    try {
      dispatch({
        type: PLAYER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/players",
        { firstName, lastName, username, password },
        config
      );

      dispatch({
        type: PLAYER_REGISTER_SUCCESS,
        payload: data,
      });

      if (!localStorage.playerInfo) {
        dispatch({
          type: PLAYER_LOGIN_SUCCESS,
          payload: data,
        });
      }

      localStorage.setItem("playerInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: PLAYER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updatePlayerProfile = (player) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAYER_UPDATE_REQUEST,
    });

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/players/profile`, player, config);

    dispatch({
      type: PLAYER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {}
};

export const listPlayers = () => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_LIST_REQUEST });

    const { data } = await axios.get("/api/players");

    dispatch({
      type: PLAYER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAYER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listPlayerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLAYER_DETAILS_REQUEST });

    const {
      playerLogin: { playerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${playerInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/players/${id}`, config);

    dispatch({
      type: PLAYER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAYER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const getPlayerProfile = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: PLAYER_PROFILE_REQUEST });
//     const { data } = await axios.get("/api/players/profile");
//   } catch (error) {}
// };
