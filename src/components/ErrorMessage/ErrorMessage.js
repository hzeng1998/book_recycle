import React from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {getMyOrders, getMyTrades, logout, resetErrorMessage} from "../../actions";
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  snackbar: {
    position: 'absolute',
    bottom: 0
  },
  snackbarContent: {
    width: "auto",
  },
});

class ErrorMessage extends React.Component {

  handleFeedBack = (error) => {
    const {handleClose, authError, getMyOrders, getMyTrades} = this.props;
    switch (error) {
      case 'Token is invalid':
        return () => {
          handleClose();
          authError();
        };
      case 'Publish Success':
        return () => {
          getMyOrders();
          handleClose();
        };
      case 'Confirm Success':
        return () => {
          getMyTrades();
          handleClose();
        };
      default:
        return handleClose;
    }
  };

  render() {
    const {classes, error} = this.props;
    return (
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={this.handleFeedBack(error)}
        ContentProps={{
          'aria-describedby': 'snackbar-fab-message-id',
          className: classes.snackbarContent,
        }}
        message={<span id="snackbar-fab-message-id">{error}</span>}
        action={
          <Button color="inherit" size="small" onClick={this.handleFeedBack(error)}>
            OK
          </Button>
        }
        className={classes.snackbar}
      />);
  }
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  authError: PropTypes.func.isRequired,
  getMyOrders: PropTypes.func.isRequired,
  getMyTrades: PropTypes.func.isRequired
};

const initMapStateToProps = (state, ownProps) => {
  const {errorMessage} = state;
  return {
    error: errorMessage.error,
    ...ownProps,
  }
};

export default connect(initMapStateToProps, {
  handleClose: resetErrorMessage,
  authError: logout,
  getMyOrders,
  getMyTrades
})(withStyles(styles)(ErrorMessage));