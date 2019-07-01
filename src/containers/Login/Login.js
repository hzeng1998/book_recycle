import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link, Redirect} from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {connect} from "react-redux";
import {checkAuth, setErrorMessage} from "../../actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    backgroundImage: 'url("/images/0201.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    margin: theme.spacing.unit,
    background: 'linear-gradient(to top right, #7D8DFB 0%, #B6ADFD 100%)',
  },
  form: {
    borderBottom: '#9370db',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    background: 'linear-gradient(to top right, #7D8DFB 0%, #B6ADFD 100%)',
    boxShadow: '4px 6px 16px 2px #888888',
    height: '3.5em',
    marginBottom: theme.spacing.unit * 3,
  },
  shadow: {
    textShadow: "black 0.01em 0.01em 0.02em",
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {

    if (this.state.password && this.state.email) {

      let {email, password} = this.state;
      let data = {email, password};
      console.log(data);
      this.props.checkAuth(data);
    } else {
      console.log("Incomplete");
      this.props.setErrorMessage("Please Complete All of the Required Information");
    }
    event.preventDefault();
  };

  render() {
    const {classes, isFetching, auth} = this.props;
    const {from} = this.props.location.state || {from: {pathname: "/"}};


    if (auth !== "") {
      return <Redirect to={from}/>
    }

    return (
      <Grid container justify={"center"} alignItems={"center"} direction={"row"} className={classes.root}>
        <Grid item xs={12} sm={8} md={5} lg={3}>
          <Paper className={classes.paper}>
            <Typography variant={"h2"}>{"Sign in"} </Typography>
            <form className={classes.form} onSubmit={this.handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus
                       onChange={this.handleChange("email")}/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password"
                       onChange={this.handleChange("password")}/>
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"
                                   onChange={(e) => this.setState({"remembered": e.target.value})}/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isFetching}
              >
                {"Log in"}
              </Button>
            </form>
            <Link to={"/register"}><Typography variant={"subtitle1"}>{"Did not have an account? Sign up."}</Typography></Link>
          </Paper>
          <ErrorMessage/>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.string,
  location: PropTypes.object,
  checkAuth: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const initMapStateToProps = (state) => {
  const {
    auth
  } = state;
  return {
    auth: auth.token,
    isFetching: auth.isFetching,
  }
};

export default connect(initMapStateToProps, {
  checkAuth,
  setErrorMessage,
})(withStyles(styles)(Login));