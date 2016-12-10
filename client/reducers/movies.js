import * as actions from '../actions/movies';

const initialState = {
  loading: false,
  movies: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.MOVIES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.MOVIES_SUCCESS: {
      return {
        movies: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
};
