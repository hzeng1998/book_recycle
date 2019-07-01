import * as ActionTypes from '../actions';

const initialState = {
  isFetching: false,
  token: window.localStorage.getItem("token") || "",
};

const auth = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.AUTH_FAILURE:
      window.localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isFetching: false,
      };
    case ActionTypes.AUTH_SUCCESS:
      window.localStorage.setItem("token", action.response.data.token);
      return {
        ...state,
        token: action.response.data.token,
        isFetching: false,
      };
    case ActionTypes.AUTH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.LOG_OUT:
      window.localStorage.removeItem("token");
      return {
        ...state,
        token: "",
      };
    default:
      return state;
  }
};

export default auth;
