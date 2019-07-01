import React, {Fragment} from 'react';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {withStyles} from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid/Grid";
import {connect} from "react-redux";
import {getInfoList, updateInfo} from "../../actions";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
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
  root: {
    flexGrow: 1
  }
});

class Notification extends React.Component {

  componentDidMount = () => {
    const {isFetching, getInfoList} = this.props;
    if (!isFetching) {
      getInfoList();
    }
  };

  render() {
    const {classes, updateInfo} = this.props;
    let notification = this.props.notification.filter(ele => !!Number(ele.type));
    notification.sort((a, b) => a.read - b.read);
    return (
      <Grid container justify={"space-around"} direction={"row"} className={classes.root}>
        <CssBaseline/>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.text} variant="h5" gutterBottom>
              Notifications
            </Typography>
            <List className={classes.list}>
              {notification.map(({type, detail, infoDate, read}, index) => (
                <Fragment key={type + detail + index}>
                  {new Date().getDate() - new Date(infoDate).getDate() > 1 &&
                  <ListSubheader className={classes.subHeader}>Ago</ListSubheader>}
                  {new Date().getDate() - new Date(infoDate).getDate() === 1 &&
                  <ListSubheader className={classes.subHeader}>Yesterday</ListSubheader>}
                  {new Date().getDate() - new Date(infoDate).getDate() === 0 &&
                  <ListSubheader className={classes.subHeader}>Today</ListSubheader>}
                  <Link to={'/trade'}>
                    <ListItem button onClick={() => updateInfo({type, detail})}>
                      <Avatar>{read ? <NotificationsIcon/> : '未读'}</Avatar>
                      <ListItemText primary={Number(type) ? '交易确认提醒' : '系统消息'}
                                    secondary={Number(type) ? `您有新交易待确认，订单号为${detail}，点击跳转到交易详情页查看` : detail}/>
                    </ListItem>
                  </Link>
                </Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  getInfoList: PropTypes.func.isRequired,
  notification: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default connect((state) => (
  {
    notification: state.infoList.data,
    isFetching: state.infoList.isFetching
  }
), {
  getInfoList,
  updateInfo
})(withStyles(styles)(Notification));

