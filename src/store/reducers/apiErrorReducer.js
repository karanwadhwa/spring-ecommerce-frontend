import { API_ERROR, LOGOUT } from "../types";

const initialState = {
  error: "",
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case API_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
