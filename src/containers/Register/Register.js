import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CameraAlt from '@material-ui/icons/CameraAlt';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import {Link, Redirect} from "react-router-dom";
import Paper from "@material-ui/core/Paper/Paper";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {connect} from "react-redux";
import {getVerifyCode, register, resetErrorMessage, setErrorMessage} from "../../actions";

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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      checkPassword: "",
      email: "",
      file: "",
      filePath: "",
    };
    this.inputRef = React.createRef();
    this.classes = props;
    this.handleChange = this.handleChange.bind(this);
    this.chooseFile = this.choose.bind(this);
  }

  choose = () => {
    this.inputRef.current.click();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {

    if (this.state.name
      && this.state.password
      && this.state.checkPassword
      && this.state.email
      && this.state.file) {

      let {password, email, checkPassword, verifyCode, file, name} = this.state;

      if (password !== checkPassword) {
        this.props.setErrorMessage("The Repetitive password is Not Match");
        return;
      }
      if (this.state.name.length >= 6 && this.state.name.length < 45) {
        this.props.setErrorMessage("The name length should between 6 and 45");
        return;
      }
      if (this.state.password.length >= 6 && this.state.name.length < 60) {
        this.props.setErrorMessage("The name length should between 6 and 60");
        return;
      }
      let data = new FormData();
      data.append('code', verifyCode);
      data.append('file', file);
      data.append('email', email);
      data.append('password', password);
      data.append('username', name);

      this.props.register(data);

    } else {
      console.log("Incomplete");
      this.props.setErrorMessage("Please Complete All of the Required Information");
    }
    event.preventDefault();
  };

  uploadImage = (e) => {
    console.log("upload file " + e.target.files[0]);
    console.log("file name:", e.target.files[0].name);
    this.setState({"file": e.target.files[0], filePath: URL.createObjectURL(e.target.files[0])});
  };

  render() {
    const {classes, status} = this.props;

    const from = {pathname: "/"};

    if (status !== "") {
      return <Redirect to={from}/>
    }

    return (
      <Grid container justify={"center"} alignItems={"center"} direction={"row"} className={classes.root}>
        <Grid item xs={12} sm={8} md={5} lg={3}>
          <Paper className={classes.paper}>

            <Typography
              variant="h4" component={"h2"} color={"primary"} style={{marginBottom: "1em"}}
              className={classes.shadow}>
              Tell us about yourself
            </Typography>

            <Grid container justify="flex-start" alignItems="center">
              <div
                style={{
                  backgroundColor: '#fffff',
                  borderColor: '#B6ADFD',
                  boxShadow: '0 0 0 0.1rem rgba(0,123,255,.5)',
                  borderRadius: "56px",
                }}
                onClick={this.chooseFile}>

                <Avatar className={classes.avatar} src={this.state.file ? this.state.filePath : ""}>
                  {this.state.file ? "" : <CameraAlt/>}
                </Avatar>

              </div>
              <Typography
                variant={"h5"} style={{marginLeft: "1em"}} color={"secondary"}>
                {this.state.file ? this.state.file.name : "Add Profile Picture"}
              </Typography>
            </Grid>

            <Typography variant={"subtitle1"} style={{textAlign: "left", color: "grey", marginTop: "1em"}}>Register
              via your email to connect with you</Typography>

            <form className={classes.form} onSubmit={this.handleSubmit}>

              <input type="file" name="profileImage" onChange={this.uploadImage}
                     style={{display: 'none'}}
                     ref={this.inputRef}/>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" name="name" value={this.state.name}
                       onChange={this.handleChange('name')}
                       autoComplete="name" autoFocus/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type="password" id="password" name="password" value={this.state.password}
                       onChange={this.handleChange("password")}
                       autoComplete="new-password"/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="checkPassword">Confirm password</InputLabel>
                <Input type="password" id="checkPassword" name="checkPassword"
                       value={this.state.checkPassword}
                       onChange={this.handleChange("checkPassword")} autoComplete="new-password"/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input type="email" id="email" name="email" value={this.state.email}
                       onChange={this.handleChange("email")}
                       autoComplete="email"/>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                disabled={this.props.isFetchingRegister}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {"SUBMIT"}
              </Button>
            </form>
            <Link to={"/login"}><Typography
              variant={"subtitle1"}>{"Already have an account? Sign in."}</Typography></Link>
          </Paper>
          <ErrorMessage/>
        </Grid>
      </Grid>
    );
  }
}


Register.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  isFetchingVerifyCode: PropTypes.bool.isRequired,
  isFetchingRegister: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  getVerifyCode: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const initMapStateToProps = (state) => {
  const {reg: {verifyCode, register}} = state;
  return {
    status: register.token,
    isFetchingVerifyCode: verifyCode.isFetching,
    isFetchingRegister: register.isFetching,
  }
};

export default connect(initMapStateToProps, {
  register,
  getVerifyCode,
  resetErrorMessage,
  setErrorMessage,
})(withStyles(styles)(Register));