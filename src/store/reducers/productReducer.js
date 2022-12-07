import {
  ADD_TO_CART,
  ADD_TO_ORDERS,
  CLEAR_CART,
  LOGOUT,
  REMOVE_FROM_CART,
  SET_ALL_PRODUCTS,
  SET_ORDERS,
} from "../types";

const initialState = {
  allItems: [],
  cart: [],
  orders: [],
};

export default (state = initialState, action) => {
  let cart = [...state.cart];
  switch (action.type) {
    case SET_ALL_PRODUCTS:
      return { ...state, allItems: action.payload };
    case ADD_TO_CART:
      const index = cart.findIndex((i) => i.id === action.payload.id);
      if (index === -1) cart.push(action.payload);
      else cart[index] = action.payload;
      return { ...state, cart };
    case REMOVE_FROM_CART:
      cart = state.cart.filter((i) => i.id !== action.payload);
      return { ...state, cart };
    case CLEAR_CART:
      return { ...state, cart: [] };
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case ADD_TO_ORDERS:
      return { ...state, orders: [...state.orders, action.payload] };
    case LOGOUT:
      return initialState;
    default:
      return initialState;
  }
};
