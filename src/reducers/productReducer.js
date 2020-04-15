import {
  FETCH_PRODUCTS_BEGINS,
  FETCH_PRODUCTS_SUCCESSFUL,
  FETCH_PRODUCTS_FAILURE,
} from "../actions/types";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function designs(state = initialState, action) {
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

    default:
      return state;
  }
}
