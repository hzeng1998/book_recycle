import {PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS} from '../actions';

const initialState = {
  isFetching: false,
};

const profile = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        ...action.response.data,
        isFetching: false
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default profile;