import React from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import {getGoods} from "../../actions";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import GoodList from "../../components/GoodList/GoodList";
import Typography from "@material-ui/core/Typography/Typography";
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import DoneIcon from '@material-ui/icons/Done';
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button";
import FilterIcon from "@material-ui/icons/FilterList";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 1,
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  chip: {
    margin: theme.spacing.unit,
  },
  tag: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const types = ['文学', '教育', '科学', '计算机', '艺术', '经管'];

class Market extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      tag: []
    };
  }

  componentDidMount() {
    if (this.props.isFetching === false) {
      this.props.getGoods((this.props.type ? this.props.type : 'all') + '?page=' + this.state.page);
    }
  }

  handleSelect = (index, type) => () => {
    type ? this.setState({
      tag: Array.from(new Set(this.state.tag.concat(index)))
    }) : this.setState({
      tag: this.state.tag.filter((x) => x !== index)
    });
  };

  handleFilter = () => {
    if (this.props.isFetching === false)
      this.props.getGoods((this.props.type ? this.props.type : 'all') + '?page=' + this.state.page + '&tag=' + this.state.tag.join());
  };

  render() {

    const {classes} = this.props;

    return (
      <Grid container justify={"space-around"} alignItems={"flex-start"} direction={"row"} className={classes.root}>

        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className={classes.tag}>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleFilter}>
              Filter
              <FilterIcon className={classes.rightIcon}/>
            </Button>
            {this.state.tag.map((type) => (
              <Chip
                avatar={<Avatar>Tag</Avatar>}
                label={types[type]}
                clickable
                className={classes.chip}
                color="primary"
                onDelete={this.handleSelect(type, 0)}
                key={type}
              />))}
          </Paper>
        </Grid>
        <Grid container style={{
          flexWrap: 'wrap'
        }} justify={'center'} alignItems={'center'}>
          <Typography variant={'h6'}>{'所有标签: '}</Typography>
          {types.map((type, index) => (
            <Chip
              avatar={<Avatar>Tag</Avatar>}
              label={type}
              clickable
              className={classes.chip}
              color="primary"
              onDelete={this.handleSelect(index, 1)}
              deleteIcon={<DoneIcon/>}
              key={index}
            />))}
        </Grid>
        <GoodList/>
        <ErrorMessage/>
      </Grid>
    );
  }
}

Market.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  getGoods: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const initMapStateToProps = (state, own) => {
  const {goods: {data, isFetching}} = state;
  return {
    data,
    isFetching,
    ...own
  }
};

export default connect(initMapStateToProps, {
  getGoods
})(withStyles(styles)(Market));