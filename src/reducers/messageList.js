import {MESSAGE_LIST_FAILURE, MESSAGE_LIST_REQUEST, MESSAGE_LIST_SUCCESS} from '../actions';

const initialState = {
  isFetching: false,
  data:[]
};

const messageList = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case MESSAGE_LIST_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case MESSAGE_LIST_SUCCESS:
      return {
        ...state,
        data: action.response.data,
        isFetching: false
      };
    case MESSAGE_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default messageList;