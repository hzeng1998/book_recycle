import React from "react";
import {Redirect, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} render={props => {
    console.log(props);
    return auth !== ""
      ? <Component {...props}/>
      : <Redirect to={{
        pathname: "/login",
        state: {from: props.location}
      }}/>
  }}/>
);

const initMapStateToProps = (state) => {
  const {auth} = state;
  return {
    auth: auth.token,
  }
};

export default withRouter(connect(initMapStateToProps)(PrivateRoute));