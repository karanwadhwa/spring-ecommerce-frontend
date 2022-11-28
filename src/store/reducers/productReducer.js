import { SET_ALL_PRODUCTS } from "../types";

const initialState = {
  allItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return { ...state, allItems: action.payload };
    default:
      return initialState;
  }
};
