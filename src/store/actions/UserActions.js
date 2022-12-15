import axios from "axios";
import { apiURL } from "../../variable";
import { API_ERROR, SET_AUTH_USER } from "../types";

export const saveAddress = (userid, address) => (dispatch) => {
  axios
    .post(`${apiURL}/user/${userid}/address/add`, { ...address })
    .then((res) => {
      dispatch({ type: SET_AUTH_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err, err.response);
      dispatch({
        type: API_ERROR,
        payload:
          err.response?.data?.error ??
          "Failed to save address. Please try again.",
      });
      setTimeout(() => dispatch({ type: API_ERROR, payload: "" }), 5000);
    });
};

export const saveProfile = (user) => (dispatch) => {
  axios
    .post(`${apiURL}/user/profile/update`, user)
    .then((res) => {
      dispatch({ type: SET_AUTH_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err, err.response);
      // alert(err.response?.data?.error);
      setTimeout(() => dispatch({ type: API_ERROR, payload: "" }), 5000);
      dispatch({
        type: API_ERROR,
        payload:
          err.response?.data?.error ??
          "Failed to save user profile. Please try again.",
      });
    });
};
