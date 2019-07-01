import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

function ComplexGrid(props) {
  const { classes, element} = props;
  const {title, src, intro, price, writer, trader} = element;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="order" src={src} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography gutterBottom variant={'subtitle1'}>{intro}</Typography>
                <Typography color="textSecondary">{writer}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{ cursor: 'pointer' }}>{trader ? "已完成": "未完成"}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{'￥' + price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);