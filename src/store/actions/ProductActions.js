import axios from "axios";
import { apiURL } from "../../variable";
import { SET_ALL_PRODUCTS } from "../types";

export const getAllProducts = () => (dispatch) => {
  axios
    .get(`${apiURL}/product/all`)
    .then((response) => {
      dispatch({ type: SET_ALL_PRODUCTS, payload: response.data });
    })
    .catch((error) => {
      console.log(error, error.response);
      alert("Error fetching products!");
    });
};
