import {
  FETCH_PRODUCTS_BEGINS,
  FETCH_PRODUCTS_SUCCESSFUL,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCTS_BEGINS,
  ADD_PRODUCTS_SUCCESSFUL,
  ADD_PRODUCTS_FAILURE,
} from "./types";
import axios from "axios";
import FormData from "form-data";

const apiUrl = "https://zion-backend.herokuapp.com/api/v1";
const token = localStorage.getItem("token");

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

export function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductBegins());
    axios
      .get(`${apiUrl}/products`)
      .then((response) => {
        dispatch(fetchProductSuccess(response.data));
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
    axios({
      method: "post",
      url: `${apiUrl}/add_product`,
      data: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data", token: token },
      },
    })
      .then((response) => {
        dispatch(addProductSuccess(response.data));
      })
      .catch((error) => {
        dispatch(addProductFailure(error));
      });
  };
}
