import axios from "axios";
import { redirect } from "react-router-dom";
import { apiURL } from "../../variable";
import { LOGOUT, SET_AUTH_ERROR, SET_AUTH_USER } from "../types";

export const loginUser = (email, password) => (dispatch) => {
  dispatch({ type: SET_AUTH_ERROR, payload: "" });
  axios
    .post(`${apiURL}/auth/login`, {
      email,
      password,
    })
    .then((response) => {
      dispatch({ type: SET_AUTH_USER, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: SET_AUTH_ERROR, payload: err.response?.data?.error });
    });
};

export const signupUser = (payload) => (dispatch) => {
  axios
    .post(`${apiURL}/auth/signup`, payload)
    .then((response) => {
      dispatch({ type: SET_AUTH_USER, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: SET_AUTH_ERROR, payload: err.response?.data?.error });
    });
};

export const logout = () => {
  redirect("/login");
  return { type: LOGOUT };
};
