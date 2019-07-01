import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";
import {connect} from "react-redux";
import Chip from "@material-ui/core/Chip/Chip";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {setErrorMessage, submitTrades} from "../../actions";
import MessageBox from "../MessageBox/MessageBox";

class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      price: 0,
      way: 0,
    }
  }

  handleChange = (value) => (event) => {
    this.setState({
      [value]: event.target.value
    })
  };

  handleSubmit = () => {
    const {address} = this.state;
    if (address) {
      this.props.submitTrades({...this.state, id: this.props.data.id});
      this.props.handleClose();
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this book, please enter your address and select necessary information here. We will
              generate
              an order for you.
            </DialogContentText>
            <TextField
              id="address"
              label="Address"
              margin="normal"
              variant="outlined"
              fullWidth
              type={"address"}
              value={this.state.address}
              onChange={this.handleChange("address")}
            />
            <Grid container justify={'space-between'}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="price"
                  label="价格"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  type={"number"}
                  value={this.state.price}
                  onChange={this.handleChange("price")}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="trade_way"
                  select
                  label="选择交易方式"
                  value={this.state.way}
                  onChange={this.handleChange('way')}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {[{value: 0, label: '邮寄'}, {value: 1, label: '面交'}].map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const SubscribeForm = connect(() => ({}), {
  submitTrades,
  setErrorMessage
})(FormDialog);

const itemStyles = (theme) => ({
  card: {
    width:'445px',
    margin: theme.spacing.unit * 2,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit
    }
  },
  media: {
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: '200px'
    }
  },
  chip: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
});


const types = ['文学', '教育', '科学', '计算机', '艺术', '经管'];
let fin = new Map();
fin.set(3, '3成新');
fin.set(5, '5成新');
fin.set(7, '7成新');
fin.set(9, '5成新');
fin.set(9.5, '9.5成新');
fin.set(10, '全新');

class ImgMediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openContact: false,
      openDetail: false,
    }
  }

  handleClickOpen = (value) => () => {
    this.setState({[value]: true});
  };

  handleClose = (value) => () => {
    this.setState({[value]: false});
  };

  render() {
    const {classes, item} = this.props;
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardActionArea onClick={() => window.location.href = item.url || '#'}>
            <CardMedia
              component="img"
              alt="goods"
              height="380"
              className={classes.media}
              image={item.src}
            />
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom variant="h5">
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom variant="h6">
                    {'ISBN: ' + item.isbn}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom variant="h6">
                    {item.writer}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom variant="h6">
                    {`￥${item.price}`}
                  </Typography>
                </Grid>
              </Grid>
              <Typography gutterBottom variant='subtitle1'>
                {item.intro}
              </Typography>
              <Chip
                label={types[Number(item.type)]}
                clickable
                className={classes.chip}
                color="primary"
              />
              <Chip
                label={fin.get(item.fineness) ? fin.get(item.fineness) : '全新'}
                clickable
                className={classes.chip}
                color="primary"
              />
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleClickOpen('openContact')}>
              Contact
            </Button>
            <Button size="small" color="primary" onClick={this.handleClickOpen('openDetail')}>
              Trade
            </Button>
            <a href={item.url || '#'}>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </a>
          </CardActions>
        </Card>
        <SubscribeForm open={this.state.openDetail} handleClose={this.handleClose('openDetail')} data={{id: item.id}}/>
        <MessageBox open={this.state.openContact} handleClose={this.handleClose('openContact')} to={item.owner}/>
      </React.Fragment>
    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const GridItem = withStyles(itemStyles)(ImgMediaCard);


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 2
  },
  paper: {}
});


class GridList extends React.Component {

  render() {
    const {classes, data} = this.props;
    return (
      <Grid container className={classes.root} justify={'center'}>{
        data.length ? data.map((item, index) => (
          <GridItem item={item} key={item.src + index}/>
        )) : null
      }
      </Grid>
    );
  }
}

GridList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
};

const initMapStateToProps = (state) => {
  const {
    goods: {isFetching, data}
  } = state;
  return {isFetching, data}
};

export default connect(initMapStateToProps, {})(withStyles(styles)(GridList));