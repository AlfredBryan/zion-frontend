import {
  USER_LOGIN_BEGINS,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_FAILURE,
  USER_REGISTER_BEGINS,
  USER_REGISTER_SUCCESSFUL,
  USER_REGISTER_FAILURE,
} from "./types";
import axios from "axios";

const apiUrl = "https://zion-backend.herokuapp.com/api/v1";

export const userRegisterBegin = () => ({
  type: USER_REGISTER_BEGINS,
});

export const userRegisterSuccess = (data) => {
  return {
    type: USER_REGISTER_SUCCESSFUL,
    payload: {
      name: data.name,
      state: data.state,
      address: data.address,
      phone: data.phone,
      password: data.password,
    },
  };
};

export const userRegisterFailure = (error) => ({
  type: USER_REGISTER_FAILURE,
  payload: { error },
});

export const userLoginBegin = () => ({
  type: USER_LOGIN_BEGINS,
});

export const userLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESSFUL,
    payload: {
      phone: data.phone,
      password: data.password,
    },
  };
};

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: { error },
});

export function userRegister({ name, state, address, phone, password }) {
  return (dispatch) => {
    dispatch(userRegisterBegin());
    axios
      .post(`${apiUrl}/create_user`, { name, state, address, phone, password })
      .then((response) => {
        dispatch(userRegisterSuccess(response));
      })
      .catch((error) => dispatch(userRegisterFailure(error)));
  };
}

export function userLogin({ phone, password }) {
  return (dispatch) => {
    dispatch(userLoginBegin());
    axios
      .post(`${apiUrl}/user_login`, { phone, password })
      .then((response) => {
        dispatch(userLoginSuccess(response));
      })
      .catch((error) => dispatch(userLoginFailure(error)));
  };
}
