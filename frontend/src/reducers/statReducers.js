import { faGalacticRepublic } from "@fortawesome/free-brands-svg-icons";
import {
  STAT_CREATE_REQUEST,
  STAT_CREATE_SUCCESS,
  STAT_CREATE_FAIL,
  STAT_DELETE_REQUEST,
  STAT_DELETE_SUCCESS,
  STAT_DELETE_FAIL,
} from "../constants/statsConstants.js";

export const statCreateReducer = (state = { stat: {} }, action) => {
  switch (action.type) {
    case STAT_CREATE_REQUEST:
      return { loading: true };
    case STAT_CREATE_SUCCESS:
      return { loading: false, stat: action.payload };
    case STAT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const statDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STAT_DELETE_REQUEST:
      return { loading: true };
    case STAT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case STAT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
