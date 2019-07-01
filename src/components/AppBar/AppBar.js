import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {ExitToApp} from "@material-ui/icons"
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tab from "@material-ui/core/Tab/Tab";
import {Link} from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import './AppBar.css';
import {connect} from "react-redux";
import {getGoods, getInfoList, getUserProfile, logout} from "../../actions";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      sideOpen: false,
      word: ''
    };
  }

  componentDidMount = () => {
    this.props.getUserProfile();
    this.props.getInfoList();
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({mobileMoreAnchorEl: event.currentTarget});
  };

  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null});
  };

  handleDrawerOpen = () => {
    this.setState({
      sideOpen: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      sideOpen: false,
    })
  };

  handleSubmit = (e) => {
    if (e.keyCode === 13) {
      this.props.getGoods('/search?word=' + this.state.word)
    }
  };

  render() {
    const {mobileMoreAnchorEl} = this.state;
    const {classes, notification} = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    let newMessage = notification.filter(ele => Number(ele.type) === 0 && Number(ele.read) === 0);
    let newInfo = notification.filter(ele => Number(ele.type) === 1 && Number(ele.read) === 0);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link to={'/messages'}>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon/>
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
        </Link>
        <Link to={'/notifications'}>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <IconButton color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon/>
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
        </Link>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div onClick={this.handleDrawerOpen}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon/>
              </IconButton>
            </div>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              {"ZJU 二手书交易"}
            </Typography>
            <div className={`${classes.search} ${classes.sectionDesktop}`}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onKeyUp={this.handleSubmit}
                value={this.state.word}
                onChange={(e) => this.setState({word: e.target.value})}
              />
            </div>

            <Link to={"/"}><Tab label={"Market"}/></Link>
            <Link to={"/buy"}><Tab label={"Buy"}/></Link>
            <Link to={"/sell"}><Tab label={"Sell"}/></Link>

            <div className={classes.grow}/>

            <div className={classes.sectionDesktop}>
              <Link to={'/messages'}>
                <IconButton color="inherit">
                  <Badge badgeContent={newMessage.length} color="secondary">
                    <MailIcon/>
                  </Badge>
                </IconButton>
              </Link>
              <Link to={'/notifications'}>
                <IconButton color="inherit">
                  <Badge badgeContent={newInfo.length} color="secondary">
                    <NotificationsIcon/>
                  </Badge>
                </IconButton>
              </Link>
              <IconButton color="inherit" onClick={this.props.logout}>
                <ExitToApp/>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon/>
              </IconButton>
            </div>

          </Toolbar>
        </AppBar>
        <SideBar open={this.state.sideOpen} handleDrawerClose={this.handleDrawerClose}/>
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getGoods: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getInfoList: PropTypes.func.isRequired,
  notification: PropTypes.array.isRequired
};
const initMapStateToProps = (states) => ({
  notification: states.infoList.data
});

export default connect(initMapStateToProps, {
  logout,
  getGoods,
  getUserProfile,
  getInfoList
})(withStyles(styles)(PrimarySearchAppBar));