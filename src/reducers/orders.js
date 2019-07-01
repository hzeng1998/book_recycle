import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: [],
};

const orders = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.MY_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.MY_ORDERS_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.MY_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default orders;