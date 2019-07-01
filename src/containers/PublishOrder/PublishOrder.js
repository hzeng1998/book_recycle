import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import MenuList from "@material-ui/core/MenuList/MenuList";
import {Add} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab/Fab";
import {getMyOrders, resetErrorMessage, setErrorMessage, uploadOrders} from "../../actions";
import Order from "../../components/Order/Order";
import DetailOrder from "../../components/DetailOrder/DetailOrder";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit
    },

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
    },
  },
  menuItem: {
    height: 'auto'
  },
  paper: {
    height: '1066px',
    overflow: 'scroll',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      overflow: 'inherit'
    },
    position: 'relative'
  }
});

class PublishOrder extends React.Component {

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
      type: 0,
      isbn: '',
      open: false
    };
  }

  componentDidMount() {
    if (this.props.isFetching === false) {
      this.props.getMyOrders();
    }
  }

  handleShow = (index) => () => {
    this.setState({
      ...this.props.data[index],
      submit: false,

    });
  };

  handleAdd = () => {
    this.setState({
      order_type: 0,
      src: '',
      title: '',
      intro: '',
      writer: '',
      price: 0,
      fineness: 10,
      file: '',
      submit: true,
      url: '',
      type: 0,
      isbn: ''
    })
  };

  render() {

    const {classes, data} = this.props;

    return (
      <React.Fragment>
        <Grid container justify={"space-around"} direction={"row"} className={classes.root}>
          <Grid item xs={12} sm={8} md={4}>
            <Paper className={classes.paper}>
              <Typography variant={"h5"} className={classes.codeList}>{"我的发布订单"} </Typography>
              <MenuList>{
                data.map((element, index) => (
                  <MenuItem onClick={this.handleShow(index)} className={classes.menuItem}
                            key={element.src}>
                    <Order element={element}/>
                  </MenuItem>
                ))
              }</MenuList>
              <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleAdd}>
                <Add/>
              </Fab>
            </Paper>
          </Grid>
          <DetailOrder data={{...this.state}}/>
        </Grid>
        <ErrorMessage/>
      </React.Fragment>
    );
  }
}

PublishOrder.propTypes = {
  classes: PropTypes.object.isRequired,
  getMyOrders: PropTypes.func.isRequired,
  uploadOrders: PropTypes.func.isRequired,
  resetErrorMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

const initMapStateToProps = (state) => {
  const {orders} = state;
  return {...orders}
};

export default connect(initMapStateToProps, {
  getMyOrders,
  uploadOrders,
  setErrorMessage,
  resetErrorMessage
})(withStyles(styles)(PublishOrder));
