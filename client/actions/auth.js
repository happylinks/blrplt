export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
  };
}

export function loginSuccess(id) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      id,
    },
  };
}

export function loginFailure(message) {
  return {
    type: LOGIN_FAILURE,
    error: true,
    payload: new Error(message),
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailure(message) {
  return {
    type: LOGOUT_FAILURE,
    error: true,
    payload: new Error(message),
  };
}
