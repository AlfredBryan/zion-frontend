import {
  FETCH_PRODUCTS_BEGINS,
  FETCH_PRODUCTS_SUCCESSFUL,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCTS_BEGINS,
  ADD_PRODUCTS_SUCCESSFUL,
  ADD_PRODUCTS_FAILURE,
  ADD_TO_CART,
  FETCH_CART_BEGINS,
  FETCH_CART_SUCCESSFUL,
  FETCH_CART_FAILURE,
} from "./types";
import axios from "axios";
import FormData from "form-data";
import apiUrl from "../api";
import token from "../token";

export const fetchProductBegins = () => ({
  type: FETCH_PRODUCTS_BEGINS,
});

export const fetchProductSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESSFUL,
  payload: { products },
});

export const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error },
});

export const addProductBegin = () => ({
  type: ADD_PRODUCTS_BEGINS,
});

export const addProductSuccess = (data) => {
  return {
    type: ADD_PRODUCTS_SUCCESSFUL,
    payload: {
      product_name: data.product_name,
      description: data.description,
      price: data.price,
    },
  };
};

export const addProductFailure = (error) => ({
  type: ADD_PRODUCTS_FAILURE,
  payload: { error },
});

export const addingToCart = (data) => {
  return {
    type: ADD_TO_CART,
    payload: {
      _id: data._id,
    },
  };
};

export const fetchCartBegins = () => ({
  type: FETCH_CART_BEGINS,
});

export const fetchCartSuccess = (cart) => ({
  type: FETCH_CART_SUCCESSFUL,
  payload: { cart },
});

export const fetchCartFailure = (error) => ({
  type: FETCH_CART_FAILURE,
  payload: { error },
});

export function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductBegins());
    axios
      .get(`${apiUrl}/products`)
      .then((response) => {
        dispatch(fetchProductSuccess(response.data.data));
      })
      .catch((error) => dispatch(fetchProductFailure(error)));
  };
}

export function addProduct({ image, product_name, description, price }) {
  return (dispatch) => {
    dispatch(addProductBegin());
    const formData = new FormData();
    formData.set("product_name", product_name);
    formData.set("description", description);
    formData.set("price", price);
    formData.append("image", image);
    
      axios.post(`${apiUrl}/add_product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "token": token
        },
      })
      .then((response) => {
        if (response.status === 201) {
          dispatch(addProductSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(addProductFailure(error));
      });
  };
}

export function addToCart(id) {
  return (dispatch) => {
    axios
      .post(
        `${apiUrl}/product_select/${id}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        dispatch(addingToCart(response.data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function fetchCart() {
  // console.log(token)
  return (dispatch) => {
    dispatch(fetchCartBegins());
    axios
      .get(`${apiUrl}/cart`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        // console.log(response.data)
        dispatch(fetchCartSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
        dispatch(fetchCartFailure(error))
      });
  };
}
