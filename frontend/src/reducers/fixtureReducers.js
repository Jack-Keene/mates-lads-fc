import {
  FIXTURE_LIST_REQUEST,
  FIXTURE_LIST_SUCCESS,
  FIXTURE_LIST_FAIL,
  FIXTURE_DETAILS_REQUEST,
  FIXTURE_DETAILS_SUCCESS,
  FIXTURE_DETAILS_FAIL,
  FIXTURE_CREATE_REQUEST,
  FIXTURE_CREATE_SUCCESS,
  FIXTURE_CREATE_FAIL,
  FIXTURE_UPDATE_REQUEST,
  FIXTURE_UPDATE_SUCCESS,
  FIXTURE_UPDATE_FAIL,
} from "../constants/fixtureConstants.js";

export const fixtureCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FIXTURE_CREATE_REQUEST:
      return { loading: true };
    case FIXTURE_CREATE_SUCCESS:
      return { loading: false, success: true, fixture: action.payload };
    case FIXTURE_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const fixtureListReducer = (state = { fixtures: [] }, action) => {
  switch (action.type) {
    case FIXTURE_LIST_REQUEST:
      return { loading: true, fixtures: [] };
    case FIXTURE_LIST_SUCCESS:
      return { loading: false, fixtures: action.payload };
    case FIXTURE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fixtureDetailsReducer = (state = { fixture: {} }, action) => {
  switch (action.type) {
    case FIXTURE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FIXTURE_DETAILS_SUCCESS:
      return { loading: false, fixture: action.payload };
    case FIXTURE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const fixtureUpdateReducer = (state = { fixture: {} }, action) => {
  switch (action.type) {
    case FIXTURE_UPDATE_REQUEST:
      return { loading: true, ...state };
    case FIXTURE_UPDATE_SUCCESS:
      return { loading: false, success: true, fixture: action.payload };
    case FIXTURE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
