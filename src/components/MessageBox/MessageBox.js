import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getMessageLog, getUserInfo, setErrorMessage} from "../../actions";
import {connect} from "react-redux";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import withStyles from "@material-ui/core/es/styles/withStyles";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SocketIOClient from 'socket.io-client';

const style = (theme) => ({
  chip: {
    margin: theme.spacing.unit,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
});

let socket = '';

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log: [],
      input: ''
    }
  }

  componentDidMount = () => {
    const {profile} = this.props;
    const {to} = this.props;
    if (profile.email) {
      this.props.getUserInfo(profile.email);
      this.props.getUserInfo(to);
      if (to) {
        this.props.getMessageLog('?to=' + to);
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    const {profile} = this.props;
    const {user, to, messageLog} = this.props;

    if (prevProps.messageLog.data.join() !== messageLog.data.join()) {
      this.setState({
        log: messageLog.data
      })
    }

    if (prevProps.to !== to && this.props.open === true) {
      this.props.getMessageLog('?to=' + to);
    }

    if (prevProps.open === false && this.props.open === true) {

      this.props.getMessageLog('?to=' + to);
      socket = SocketIOClient('/');
      socket.emit('id', profile.email);
      socket.on('message', (message) => {
        message = JSON.parse(message);
        if (message.sender !== to) {
          return;
        }
        this.setState({
          log: Array.from(new Set(this.state.log.concat(message).map(x => JSON.stringify(x)))).map(x => JSON.parse(x))
        });
        if (!user[message.sender]) {
          this.props.getUserInfo(message.sender);
        }
      })
    }

    if (prevProps.open === true && this.props.open === false) {
      if (socket) {
        socket.disconnect();
      }
    }
  };

  handleChange = (value) => (event) => {
    this.setState({
      [value]: event.target.value
    })
  };

  handleSubmit = () => {
    const {input} = this.state;
    const {profile, to} = this.props;
    if (input) {
      let message = {sender: profile.email, receiver: to, message: input, sendDate: new Date()};
      this.setState({
        log: this.state.log.concat(message),
        input: ''
      });
      socket.emit('message', JSON.stringify(message));
    }
  };

  render() {
    const {classes, user, to} = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Contact</DialogTitle>
          <DialogContent>
            <Grid container justify={'flex-start'}>
              <Chip
                avatar={<Avatar alt="trader" src={user[to] ? user[to].profile_photo : null}/>}
                label={user[to] ? user[to].username : ' '}
              />
            </Grid>
            <DialogContentText>
              you can chat with the order owner in this box, the messages will be saved, you can review them
              in <ButtonBase>Message</ButtonBase>
            </DialogContentText>
            <Grid container justify={'flex-start'}>
              <Grid item xs={12} style={{
                height: '250px',
                overflow: 'scroll',
              }}>
                <List className={classes.list}>
                  {this.state.log.map(({sender, message, sendDate}, index) => (
                    <ListItem button key={'' + message + sendDate + index}>
                      <Avatar alt="Profile Picture" src={user[sender].profile_photo}/>
                      <ListItemText primary={user[sender].username} secondary={message}/>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
            <Grid container justify={'space-between'}>
              <TextField
                id="input"
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                value={this.state.input}
                onKeyUp={(e) => e.keyCode === 13 ? this.handleSubmit() : null}
                onChange={this.handleChange('input')}
                fullWidth
              />
            </Grid>
          </DialogContent>
          < DialogActions>
            < Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              SEND
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


FormDialog.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageLog: PropTypes.object.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  getMessageLog: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired
};


export default connect((state, own) => {
  const {profile, user, messageLog} = state;
  return {profile, ...own, user, messageLog}
}, {
  getMessageLog,
  getUserInfo,
  setErrorMessage
})(withStyles(style)(FormDialog));