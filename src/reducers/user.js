import {USER_FAILURE, USER_REQUEST, USER_SUCCESS} from '../actions';

const initialState = {
  isFetching: false,
};

const profile = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case USER_SUCCESS:
      return {
        ...state,
        ...action.response.data,
        isFetching: false
      };
    case USER_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default profile;