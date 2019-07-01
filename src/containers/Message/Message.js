import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import {connect} from "react-redux";
import {getMessageList, getUserInfo} from "../../actions";
import MessageBox from "../../components/MessageBox/MessageBox";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function FormDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the email address here you want contact to. Please ensure the email is sign up in the website.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="contact_address"
            label="Email Address"
            type="email"
            fullWidth
            onChange={props.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class BottomAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openAddress: false,
      address: ''
    }
  }

  componentDidMount = () => {
    if (!this.props.isFetching) {
      this.props.getMessageList();
    }
  };

  componentDidUpdate = (prevProps) => {
    const {user} = this.props;
    if (prevProps.messages.join() !== this.props.messages.join()) {
      this.props.messages.map((message) => {
        if (!user[message.sender]) {
          this.props.getUserInfo(message.sender);
        }
        return true;
      })
    }
  };

  handleClick = (value) => () => {
    this.setState({address: value, open: true})
  };

  handleClose = (value) => () => {
    this.setState({[value]: false});
    if (value === 'openAddress' && this.state.address) {
      this.setState({open: true})
    }
  };

  handleAddContact = () => {
    this.setState({openAddress: true})
  };

  handleAddressChange = (e) => {
    this.setState({address: e.target.value})
  };

  render() {
    const {classes, user} = this.props;
    return (
      <React.Fragment>
        <CssBaseline/>
        <Paper square className={classes.paper} elevation={0}>
          <Typography className={classes.text} variant="h5" gutterBottom>
            Messages
          </Typography>
          <List className={classes.list}>
            {this.props.messages.map(({sendDate, sender, message}) => (
              <Fragment key={sendDate + message + sender}>
                {(new Date().getTime() - new Date(sendDate).getTime()) > 172800000 &&
                <ListSubheader className={classes.subHeader}>Ago</ListSubheader>}
                {(new Date().getTime() - new Date(sendDate).getTime()) <= 172800000 && (new Date().getTime() - new Date(sendDate).getTime()) > 86400000 &&
                <ListSubheader className={classes.subHeader}>Yesterday</ListSubheader>}
                {(new Date().getTime() - new Date(sendDate).getTime()) <= 86400000 &&
                <ListSubheader className={classes.subHeader}>Today</ListSubheader>}
                <ListItem button onClick={this.handleClick(sender)}>
                  <Avatar alt="Profile Picture" src={user[sender] ? user[sender].profile_photo : '#'}/>
                  <ListItemText primary={user[sender] ? user[sender].username : ' '} secondary={message}/>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Paper>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={this.handleAddContact}>
              <AddIcon/>
            </Fab>
          </Toolbar>
        </AppBar>
        <MessageBox open={this.state.open} handleClose={this.handleClose('open')} to={this.state.address}/>
        <FormDialog open={this.state.openAddress} handleClose={this.handleClose('openAddress')}
                    handleChange={this.handleAddressChange}/>
      </React.Fragment>
    );
  }
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  getMessageList: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired
};

const initMapStateToProps = (state) => {
  const {messageList, user} = state;
  return {messages: messageList.data, isFetching: messageList.isFetching, user};
};

export default connect(initMapStateToProps, {
  getMessageList,
  getUserInfo
})(withStyles(styles)(BottomAppBar));