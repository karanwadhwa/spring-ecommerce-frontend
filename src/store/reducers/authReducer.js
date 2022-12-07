import { LOGOUT, SET_AUTH_ERROR, SET_AUTH_USER } from "../types";

const initialState = {
  error: "",
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_ERROR:
      return { ...state, error: action.payload };
    case SET_AUTH_USER:
      return { ...state, error: "", user: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
