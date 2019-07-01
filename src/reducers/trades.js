import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: [],
};

const trades = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.MY_TRADES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.MY_TRADES_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.MY_TRADES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default trades;