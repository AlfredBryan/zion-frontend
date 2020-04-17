import {
  FETCH_PRODUCTS_BEGINS,
  FETCH_PRODUCTS_SUCCESSFUL,
  FETCH_PRODUCTS_FAILURE,
  ADD_PRODUCTS_BEGINS,
  ADD_PRODUCTS_SUCCESSFUL,
  ADD_PRODUCTS_FAILURE,
  ADD_TO_CART,
  FETCH_CART_BEGINS,
  FETCH_CART_FAILURE,
  FETCH_CART_SUCCESSFUL,
} from "../actions/types";

const initialState = {
  products: [],
  cart: [],
  product_name: "",
  price: "",
  description: "",
  loading: false,
  error: null,
};

export default function products(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case ADD_PRODUCTS_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ADD_PRODUCTS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        product_name: action.payload.product_name,
        price: action.payload.price,
        description: action.payload.description,
      };

    case ADD_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_TO_CART:
      return {
        ...state,
        loading: false,
      };

    case FETCH_CART_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CART_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
      };

    case FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
