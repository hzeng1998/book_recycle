import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: []
};

const goods = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.GOODS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.GOODS_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data
      };
    case ActionTypes.GOODS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default goods;