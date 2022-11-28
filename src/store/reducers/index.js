import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  products: productReducer,
});
