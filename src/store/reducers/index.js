import { combineReducers } from "@reduxjs/toolkit";
import apiErrorReducer from "./apiErrorReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  products: productReducer,
  apiError: apiErrorReducer,
});
