import React, {Component} from 'react';
import './App.css';
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {blue, purple} from "@material-ui/core/colors";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import AppBar from "../../components/AppBar/AppBar";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Market from "../Market/Market";
import SellBook from "../SellBook/SellBook";
import BuyBook from "../BuyBook/BuyBook";
import DevTools from "../DevTools/DevTools";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Storage from "../PublishOrder/PublishOrder";
import Trade from "../Trade/Trade";
import Message from '../Message/Message';
import Notification from '../Notification/Notification';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple,
  },
  typography: {useNextVariants: true},
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideOpen: false,
    };

  }

  render() {

    const {store} = this.props;

    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Switch>
              <Route path={"/register"} component={Register}/>
              <Route path={"/login"} component={Login}/>
              <Route path={"/"} render={() =>
                <React.Fragment>
                  <AppBar/>
                  <PrivateRoute path={"/"}  exact component={Market}/>
                  <PrivateRoute path={"/sell"} component={SellBook}/>
                  <PrivateRoute path={"/buy"} component={BuyBook}/>
                  <PrivateRoute path={"/publish_order"} component={Storage}/>
                  <PrivateRoute path={"/trade"} component={Trade}/>
                  <PrivateRoute path={"/messages"} component={Message}/>
                  <PrivateRoute path={"/notifications"} component={Notification}/>
                </React.Fragment>
              }/>
            </Switch>
          </MuiThemeProvider>
        </Router>
        <DevTools/>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
