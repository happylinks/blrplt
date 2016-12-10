export const MOVIES_REQUEST = 'MOVIES_REQUEST';
export const MOVIES_SUCCESS = 'MOVIES_SUCCESS';
export const MOVIES_FAILURE = 'MOVIES_FAILURE';

export function moviesRequest() {
  return {
    type: MOVIES_REQUEST,
  };
}

export function moviesSuccess(movies) {
  return {
    type: MOVIES_SUCCESS,
    payload: movies,
  };
}

export function moviesFailure(message) {
  return {
    type: MOVIES_FAILURE,
    error: true,
    payload: new Error(message),
  };
}
