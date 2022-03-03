import {
  PLAYER_LIST_REQUEST,
  PLAYER_LIST_SUCCESS,
  PLAYER_LIST_FAIL,
  PLAYER_DETAILS_REQUEST,
  PLAYER_DETAILS_SUCCESS,
  PLAYER_DETAILS_FAIL,
  PLAYER_LOGIN_REQUEST,
  PLAYER_LOGIN_FAIL,
  PLAYER_LOGIN_SUCCESS,
  PLAYER_LOGOUT,
  PLAYER_REGISTER_REQUEST,
  PLAYER_REGISTER_SUCCESS,
  PLAYER_REGISTER_FAIL,
  PLAYER_UPDATE_REQUEST,
  PLAYER_UPDATE_SUCCESS,
  PLAYER_UPDATE_FAIL,
} from "../constants/playerConstants.js";

export const playerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_LOGIN_REQUEST:
      return { loading: true };
    case PLAYER_LOGIN_SUCCESS:
      return { loading: false, success: true, playerInfo: action.payload };
    case PLAYER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PLAYER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const playerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_REGISTER_REQUEST:
      return { loading: true };
    case PLAYER_REGISTER_SUCCESS:
      return { loading: false, playerInfo: action.payload };
    case PLAYER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const playerListReducer = (state = { players: [] }, action) => {
  switch (action.type) {
    case PLAYER_LIST_REQUEST:
      return { loading: true, players: [] };
    case PLAYER_LIST_SUCCESS:
      return { loading: false, players: action.payload };
    case PLAYER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const playerDetailsReducer = (state = { player: {} }, action) => {
  switch (action.type) {
    case PLAYER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PLAYER_DETAILS_SUCCESS:
      return { loading: false, player: action.payload };
    case PLAYER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const playerUpdateReducer = (state = { player: {} }, action) => {
  switch (action.type) {
    case PLAYER_UPDATE_REQUEST:
      return { loading: true, ...state };
    case PLAYER_UPDATE_SUCCESS:
      return { loading: false, success: true, player: action.payload };
    case PLAYER_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
