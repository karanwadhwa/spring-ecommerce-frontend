import axios from "axios";
import { apiURL } from "../../variable";
import { SET_AUTH_USER } from "../types";

export const saveAddress = (userid, address) => (dispatch) => {
  axios
    .post(`${apiURL}/user/${userid}/address/add`, { ...address })
    .then((res) => {
      dispatch({ type: SET_AUTH_USER, payload: res.data });
    })
    .catch((err) => {
      console.log(err, err.response);
      alert("Failed to save address. Please try again.");
    });
};
