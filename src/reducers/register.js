import * as ActionTypes from "../actions";
import {combineReducers} from "redux";

const initialState = {
  isFetching: false,
};

const verifyCode = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.VERIFY_FAILURE:
    case ActionTypes.AUTH_SUCCESS:
      return {
        isFetching: false,
      };
    case ActionTypes.AUTH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

const register = (state = {...initialState, token:""}, action) =>{
  const {type} = action;
  switch (type) {
    case ActionTypes.REGISTER_FAILURE:
      return {
        isFetching: false,
        token: "",
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        isFetching: false,
        token: action.response.data.token,
      };
    case ActionTypes.REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default combineReducers({
  verifyCode,
  register,
});