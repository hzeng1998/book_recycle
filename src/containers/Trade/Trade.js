import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper/Paper";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getGoods, getMyTrades, setErrorMessage} from "../../actions";
import Typography from "@material-ui/core/Typography/Typography";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import TradeItem from "../../components/Trade/Trade";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const styles = (theme) => ({
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit
    }
  },
  fab: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit
    }
  },
  codeList: {
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 2
    }
  },
  menuItem: {
    height: 'auto'
  },
  paper: {}
});

class Trade extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order_type: 0,
      src: '',
      title: '',
      intro: '',
      writer: '',
      price: '',
      fineness: '',
      file: '',
      submit: true,
      url: '',
      open: false
    };
  }


  componentDidMount() {
    if (this.props.trades.isFetching === false) {
      this.props.getMyTrades();
    }
  }

  render() {
    let {classes, trades} = this.props;
    trades.data.sort((a, b) => (a.status - b.status) === 0 ? (b.id - a.id) : (a.status - b.status));
    return (
      <React.Fragment>
        <Grid container justify={"space-around"} direction={"row"} className={classes.root}>
          <Grid item xs={12} sm={10} md={8}>
            <Paper className={classes.paper}>
              <Typography variant={"h5"} className={classes.codeList}>{"我的交易订单"} </Typography>
              <MenuList>{
                trades.data.map((element) => (
                  <MenuItem className={classes.menuItem} key={element.id}>
                    <TradeItem element={element}/>
                  </MenuItem>
                ))
              }</MenuList>
            </Paper>
          </Grid>
        </Grid>
        <ErrorMessage/>
      </React.Fragment>
    );
  }
}

Trade.propTypes = {
  trades: PropTypes.object.isRequired,
  getGoods: PropTypes.func.isRequired,
  getMyTrades: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
};

const initMapStateToProps = (state) => {
  const {trades} = state;
  return {
    trades
  }
};

export default connect(initMapStateToProps, {
  getGoods,
  getMyTrades,
  setErrorMessage,
})(withStyles(styles)(Trade));