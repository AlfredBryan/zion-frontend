import {
  USER_LOGIN_BEGINS,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_FAILURE,
  USER_REGISTER_BEGINS,
  USER_REGISTER_SUCCESSFUL,
  USER_REGISTER_FAILURE,
} from "../actions/types";

const initialState = {
  name: "",
  phone: "",
  state: "",
  address: "",
  password: "",
  loading: false,
  error: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_REGISTER_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        phone: action.payload.phone,
        state: action.payload.state,
        address: action.payload.address,
        password: action.payload.password,
      };

    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case USER_LOGIN_BEGINS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        phone: action.payload.phone,
        password: action.payload.password,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
