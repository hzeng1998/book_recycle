import React from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {logout, resetErrorMessage} from "../../actions";
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  snackbar: {
    position: 'absolute',
  },
  snackbarContent: {
    width: "auto",
  },
});

class ErrorMessage extends React.Component {

  render() {
    const {classes, error, handleClose, authError, handleSuccess} = this.props;
    return (
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={
          (error === "Token is invalid") ?
            () => {
              handleClose();
              authError();
            } : (error === 'Success') ? () => {
              debugger;
              handleSuccess();
              handleClose();
            } : handleClose}
        ContentProps={{
          'aria-describedby': 'snackbar-fab-message-id',
          className: classes.snackbarContent,
        }}
        message={<span id="snackbar-fab-message-id">{error}</span>}
        action={
          <Button color="inherit" size="small" onClick={(error === "Token is invalid") ?
            () => {
              handleClose();
              authError();
            } : (error === 'Success') ? () => {
              debugger;
              handleSuccess();
              handleClose();
            } : handleClose}>
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
  handleSuccess: PropTypes.func
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
})(withStyles(styles)(ErrorMessage));