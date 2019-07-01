const callApi = (endpoint, params) => {

  console.log(params);

  if (window.localStorage.getItem('token')) {
    params = Object.assign({}, params, {
      headers: {
        ...params.headers,
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }

  console.log(params);

  return fetch(endpoint, params)
    .then(response =>
      response.json().then(json => {
        if (!response.ok || (json.status && json.status === 'error') || json.message) {
          return Promise.reject(json)
        }
        return Object.assign({}, json)
      })
    )
};

export const CALL_API = "Call API";

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof  callAPI === 'undefined')
    return next(action);

  let {endpoint, params} = callAPI;
  const {types} = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  console.log(types);

  next(actionWith({type: requestType}));

  return callApi(endpoint, params)
    .then(
      response => next(actionWith({
        response,
        type: successType,
      })),
      error => next(actionWith({
        type: failureType,
        error: error.message || "Something bad happened",
      })))
}