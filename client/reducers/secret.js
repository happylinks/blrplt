import * as actions from '../actions/secret';

const initialState = {
  secret: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRET_SUCCESS: {
      return {
        secret: action.payload,
      };
    }
    default:
      return state;
  }
};
