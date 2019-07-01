import {CALL_API} from "../middleware/api";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

const fetchAuth = (data) => ({
  [CALL_API]: {
    types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
    endpoint: "/api/auth",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
    },
  },
});

export const checkAuth = ((data) => (dispatch, getState) => {
  const {token, isFetching} = getState().auth;
  if (token || isFetching)
    return null;
  return dispatch(fetchAuth(data));
});


export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";

const fetchVerifyCode = (data) => ({
  [CALL_API]: {
    types: [VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE],
    endpoint: "/api/vericode",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    },
  },
});

export const getVerifyCode = ((data) => (dispatch, getState) => {
  if (getState().reg.verifyCode.isFetching)
    return null;
  return dispatch(fetchVerifyCode(data));
});


export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

const fetchUserProfile = () => ({
  [CALL_API]: {
    types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
    endpoint: '/api/profile',
    params: {
      method: 'GET',
      mode: 'cors'
    }
  }
});

export const getUserProfile = (() => (dispatch, getState) => {
  console.log(getState().profile);
  if (getState().profile.isFetching || getState().profile.email)
    return null;
  return dispatch(fetchUserProfile());
});


export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

const fetchUserInfo = (email) => ({
  [CALL_API]: {
    types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    endpoint: '/api/user?email=' + email,
    params: {
      method: 'GET',
      mode: 'cors'
    }
  }
});

export const getUserInfo = ((email) => (dispatch, getState) => {
  if (getState().user.isFetching || getState().user[email])
    return null;
  return dispatch(fetchUserInfo(email));
});

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const fetchRegister = (data) => ({
  [CALL_API]: {
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
    endpoint: "/api/register",
    params: {
      method: "POST",
      body: data,
      mode: "cors",
    }
  }
});

export const register = ((data) => (dispatch, getState) => {
  if (getState().reg.register.isFetching)
    return null;
  return dispatch(fetchRegister(data));
});


export const GOODS_REQUEST = "GOODS_REQUEST";
export const GOODS_SUCCESS = "GOODS_SUCCESS";
export const GOODS_FAILURE = "GOODS_FAILURE";

const fetchGoods = (query) => ({
  [CALL_API]: {
    types: [GOODS_REQUEST, GOODS_SUCCESS, GOODS_FAILURE],
    endpoint: "/api/goods/" + query,
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const getGoods = (query) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(fetchGoods(query));
};


export const MESSAGE_LIST_REQUEST = "MESSAGE_LIST_REQUEST";
export const MESSAGE_LIST_SUCCESS = "MESSAGE_LIST_SUCCESS";
export const MESSAGE_LIST_FAILURE = "MESSAGE_LIST_FAILURE";

const fetchMessageList = () => ({
  [CALL_API]: {
    types: [MESSAGE_LIST_REQUEST, MESSAGE_LIST_SUCCESS, MESSAGE_LIST_FAILURE],
    endpoint: "/api/message/list",
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const getMessageList = () => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().messageList.isFetching)
    return null;
  return dispatch(fetchMessageList());
};



export const MESSAGE_LOG_REQUEST = "MESSAGE_LOG_REQUEST";
export const MESSAGE_LOG_SUCCESS = "MESSAGE_LOG_SUCCESS";
export const MESSAGE_LOG_FAILURE = "MESSAGE_LOG_FAILURE";

const fetchMessageLog = (query) => ({
  [CALL_API]: {
    types: [MESSAGE_LOG_REQUEST, MESSAGE_LOG_SUCCESS, MESSAGE_LOG_FAILURE],
    endpoint: "/api/message/log" + query,
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const getMessageLog = (query) => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().messageLog.isFetching)
    return null;
  return dispatch(fetchMessageLog(query));
};




export const INFO_LIST_REQUEST = "INFO_LIST_REQUEST";
export const INFO_LIST_SUCCESS = "INFO_LIST_SUCCESS";
export const INFO_LIST_FAILURE = "INFO_LIST_FAILURE";

const fetchInfoList = () => ({
  [CALL_API]: {
    types: [INFO_LIST_REQUEST, INFO_LIST_SUCCESS, INFO_LIST_FAILURE],
    endpoint: "/api/info",
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const getInfoList = () => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().infoList.isFetching)
    return null;
  return dispatch(fetchInfoList());
};


export const INFO_REQUEST = "INFO_REQUEST";
export const INFO_SUCCESS = "INFO_SUCCESS";
export const INFO_FAILURE = "INFO_FAILURE";

const _updateInfo = (data) => ({
  [CALL_API]: {
    types: [INFO_REQUEST, INFO_SUCCESS, INFO_FAILURE],
    endpoint: "/api/info",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
    }
  }
});

export const updateInfo = (data) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(_updateInfo(data));
};


export const CONFIRM_REQUEST = "CONFIRM_REQUEST";
export const CONFIRM_SUCCESS = "CONFIRM_SUCCESS";
export const CONFIRM_FAILURE = "CONFIRM_FAILURE";

const confirm = (query, ok) => ({
  [CALL_API]: {
    types: [CONFIRM_REQUEST, CONFIRM_SUCCESS, CONFIRM_FAILURE],
    endpoint: "/api/trades/confirm?id=" + query + '&ok=' + ok,
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const confirmTrade = (id, ok) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(confirm(id, ok));
};


export const MY_ORDERS_REQUEST = "MY_ORDERS_REQUEST";
export const MY_ORDERS_SUCCESS = "MY_ORDERS_SUCCESS";
export const MY_ORDERS_FAILURE = "MY_ORDERS_FAILURE";

const fetchMyOrders = () => ({
  [CALL_API]: {
    types: [MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAILURE],
    endpoint: "/api/goods/my",
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const getMyOrders = () => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().orders.isFetching)
    return null;
  return dispatch(fetchMyOrders());
};


export const MY_TRADES_REQUEST = "MY_TRADES_REQUEST";
export const MY_TRADES_SUCCESS = "MY_TRADES_SUCCESS";
export const MY_TRADES_FAILURE = "MY_TRADES_FAILURE";

const fetchMyTrades = () => ({
  [CALL_API]: {
    types: [MY_TRADES_REQUEST, MY_TRADES_SUCCESS, MY_TRADES_FAILURE],
    endpoint: "/api/trades",
    params: {
      method: "GET",
      mode: "cors",
    }
  }
});

export const getMyTrades = () => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().trades.isFetching)
    return null;
  return dispatch(fetchMyTrades());
};


export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const UPLOAD_FAILURE = "UPLOAD_FAILURE";

const upload = (data) => ({
  [CALL_API]: {
    types: [UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE],
    endpoint: "/api/goods",
    params: {
      method: "PUT",
      body: data,
      mode: "cors",
    }
  }
});

export const uploadOrders = (data) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(upload(data));
};


const uploadTrades = (data) => ({
  [CALL_API]: {
    types: [UPLOAD_FAILURE, UPLOAD_SUCCESS, UPLOAD_FAILURE],
    endpoint: "/api/trades",
    params: {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  }
});

export const submitTrades = (data) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(uploadTrades(data));
};


export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});

export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  message,
});


export const LOG_OUT = "LOG_OUT";

export const logout = () => ({
  type: LOG_OUT,
});