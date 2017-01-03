export const SECRET_REQUEST = 'SECRET_REQUEST';
export const SECRET_SUCCESS = 'SECRET_SUCCESS';
export const SECRET_FAILURE = 'SECRET_FAILURE';

export function secretRequest() {
  return {
    type: SECRET_REQUEST,
  };
}

export function secretSuccess(secret) {
  return {
    type: SECRET_SUCCESS,
    payload: secret,
  };
}

export function secretFailure(message) {
  return {
    type: SECRET_FAILURE,
    error: true,
    payload: new Error(message),
  };
}
