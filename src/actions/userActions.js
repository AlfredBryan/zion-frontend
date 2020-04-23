import {
  USER_LOGIN_BEGINS,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_FAILURE,
  USER_REGISTER_BEGINS,
  USER_REGISTER_SUCCESSFUL,
  USER_REGISTER_FAILURE,
  GET_USER,
  SET_CART_ITEMS,
} from './types';
import axios from 'axios';
import apiUrl from '../api'
import token from '../token'

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

export const fetchUser = (user) => ({
  type: GET_USER,
  payload: { user },
});

export const fetchCartItems = (cart) => ({
  type: SET_CART_ITEMS,
  payload: { cart },
});

export function userRegister({ name, state, address, phone, email, password }) {
  return (dispatch) => {
    dispatch(userRegisterBegin());
    axios
      .post(`${apiUrl}/create_user`, {
        name,
        state,
        address,
        phone,
        email,
        password,
      })
      .then((response) => {
        dispatch(userRegisterSuccess(response));
        localStorage.setItem('token', response.data.token);
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
        localStorage.setItem('token', response.data.token);
      })
      .catch((error) => dispatch(userLoginFailure(error.message)));
  };
}

export function getUser() {
  return (dispatch) => {
    axios
      .get(`${apiUrl}/user`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        // console.log(response.data)
        dispatch(fetchUser(response.data.data));
        dispatch(fetchCartItems(response.data.cart_items));
      });
  };
}
