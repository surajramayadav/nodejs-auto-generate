import {
  LOGIN_USER,
  GET_ADDRESSES,
  ADD_ADDRESS,
  USER_LOGOUT
} from "../Constants/action-types";

export function loginUser(payload) {
  return { type: LOGIN_USER, payload };
}

export function getAddresses(payload) {
  return { type: GET_ADDRESSES, payload };
}

export function addAddress(payload) {
  return { type: ADD_ADDRESS, payload };
}

export function userLogout(payload) {
  return { type: USER_LOGOUT, payload };
}
