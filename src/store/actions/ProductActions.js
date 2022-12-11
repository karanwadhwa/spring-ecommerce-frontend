import axios from "axios";
import { apiURL } from "../../variable";
import {
  ADD_TO_CART,
  ADD_TO_ORDERS,
  CLEAR_CART,
  REMOVE_FROM_CART,
  SET_ALL_PRODUCTS,
  SET_ORDERS,
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
  const orderTotal = parseFloat(cart.cartTotal.toFixed(2));
  const status = "completed";
  const items = cart.items.map(
    ({ name, price, cartQuantity, id, seller, thumbnail_url }) => ({
      name,
      price,
      quantity: cartQuantity,
      totalPrice: parseFloat((cartQuantity * price).toFixed(2)),
      productId: id,
      sellerId: seller,
      thumbnail_url: thumbnail_url,
    })
  );
  const payload = { orderTotal, status, items };
  axios
    .put(`${apiURL}/user/${userid}/order/create`, payload)
    .then((res) => {
      console.log(res);
      dispatch({ type: CLEAR_CART });
      dispatch({ type: ADD_TO_ORDERS, payload: res.data });
    })
    .catch((err) => console.log(err, err.response));
};

export const getAllOrders = (userid) => (dispatch) => {
  axios
    .get(`${apiURL}/user/${userid}/orders`)
    .then((response) => {
      dispatch({ type: SET_ORDERS, payload: response.data });
    })
    .catch((error) => {
      console.log(error, error.response);
      alert("Error fetching orders!");
    });
};
