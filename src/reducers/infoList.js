import {INFO_LIST_FAILURE, INFO_LIST_REQUEST, INFO_LIST_SUCCESS} from '../actions';

const initialState = {
  isFetching: false,
  data:[]
};

const infoList = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case INFO_LIST_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case INFO_LIST_SUCCESS:
      return {
        ...state,
        data: action.response.data,
        isFetching: false
      };
    case INFO_LIST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default infoList;