import {MESSAGE_LOG_FAILURE, MESSAGE_LOG_REQUEST, MESSAGE_LOG_SUCCESS} from '../actions';

const initialState = {
  isFetching: false,
  data:[]
};

const messageLog = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case MESSAGE_LOG_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case MESSAGE_LOG_SUCCESS:
      return {
        ...state,
        data: action.response.data,
        isFetching: false
      };
    case MESSAGE_LOG_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default messageLog;