import axios from "axios";
import { apiURL } from "../../variable";
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SET_ALL_PRODUCTS,
} from "../types";

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

export const addToCart = (product, cartQuantity) => {
  return { type: ADD_TO_CART, payload: { ...product, cartQuantity } };
};

export const removeFromCart = (id) => {
  return { type: REMOVE_FROM_CART, payload: id };
};

export const clearCart = () => {
  return { type: CLEAR_CART };
};

export const orderCheckout = (cart, userid) => (dispatch) => {
  console.log(cart, userid);
  const orderTotal = parseFloat(cart.cartTotal.toFixed(2));
  const status = "booked";
  const items = cart.items.forEach(({ name, price, cartQuantity }) => ({
    name,
    price,
    quantity: cartQuantity,
    totalPrice: parseFloat((cartQuantity * price).toFixed(2)),
  }));
  axios
    .put(`${apiURL}/user/${userid}/order/create`, {
      items,
      status,
      orderTotal,
    })
    .then((res) => {
      console.log(res);
      dispatch(clearCart);
    })
    .catch((err) => console.log(err, err.response));
};
