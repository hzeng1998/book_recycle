import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import {confirmTrade} from "../../actions";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

  button: {
    margin: theme.spacing.unit
  }
});

function ComplexGrid(props) {
  const {classes, element, profile} = props;
  let {trade_id, buyer, seller, address, price, way, status, id} = element;
  status = Number(status);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {'关联交易编号: ' + trade_id}
                </Typography>
                <Typography gutterBottom>{'订单编号: ' + id}</Typography>
                <Grid xs={6} item>
                  <Typography color="textSecondary">{'交易发起方: ' + buyer}</Typography>
                </Grid>
                <Grid xs={6} item>
                  <Typography color="textSecondary">{'交易确认方: ' + seller}</Typography>
                </Grid>
                <Typography color="textSecondary">{'地址: ' + address}</Typography>
              </Grid>
              <Grid item>
                <ButtonBase><Typography
                  style={{cursor: 'pointer'}}>{status === 1 ? "已完成" : status === 2 ? "取消" : '待确认'}</Typography></ButtonBase>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{'成交价格: ￥' + price}</Typography>
              <Typography variant="subtitle1">{'交易方式: ' + (Number(way) ? '面交' : '邮寄')}</Typography>
              <Grid>{profile.email === seller ?
                <Button color="secondary" variant="contained" disabled={!!status} className={classes.button}
                        onClick={() => props.confirmTrade(id, 1)}>确认订单</Button> : null}
              </Grid>
              <Grid>
                <Button color={"primary"} variant="contained" disabled={!!status} className={classes.button}
                        onClick={() => props.confirmTrade(id, 2)}>取消订单</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  confirmTrade: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect((state) => ({profile: state.profile}), {
  confirmTrade
})(withStyles(styles)(ComplexGrid));