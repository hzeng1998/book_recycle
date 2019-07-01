import * as ActionTypes from "../actions";
import {combineReducers} from "redux";
import auth from "./auth";
import reg from "./register";
import goods from "./goods";
import orders from "./orders";
import profile from './profile';
import trades from "./trades";
import user from "./user";
import messageList from "./messageList";
import infoList from "./infoList";
import messageLog from "./messageLog";

const errorMessage = (state = {error: ""}, action) => {
  const {type, error} = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return {error: "",}
  } else if (type === ActionTypes.SET_ERROR_MESSAGE) {
    return {error: action.message}
  } else if (error) {
    return {error};
  }

  return state
};

const rootReducer = combineReducers({
  auth,
  reg,
  goods,
  trades,
  errorMessage,
  messageLog,
  messageList,
  infoList,
  user,
  profile,
  orders
});

export default rootReducer;