import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TableHead from "@material-ui/core/TableHead/TableHead";
import {Link} from "react-router-dom";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };


  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {withTheme: true})(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: "100%",
  },
  table: {},
  tableWrapper: {
    overflowX: 'auto',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class CustomPaginationActionsTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: (this.props.rows.length >= 0 && this.props.rows.length < 20) ? 20 : 20,
    };
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  render() {

    const {classes, title, handleSpecify} = this.props;
    const {rowsPerPage, page} = this.state;
    const rows = this.props.rows.sort((a, b) => (a[title[0]] < b[title[0]] ? -1 : 1));
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    console.log("render tables", rows);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>{
                title.map((element, index) => (
                  <CustomTableCell align={"center"} key={index}>
                    {element}
                  </CustomTableCell>
                ))
              }
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={row.id}>{
                  Object.keys(row).map((element, index) => {
                    switch (element) {
                      case "id":
                        return null;
                      case "rank":
                        return (<CustomTableCell align={"center"} key={index}>
                          <Link to={`/rank/${row.title}`}>{row[element]}</Link>
                        </CustomTableCell>);
                      case "challenge":
                        return (<CustomTableCell align={"center"} key={index} onClick={handleSpecify(row["user_id"])}
                                                 style={{cursor: "pointer"}}>
                          {row[element]}
                        </CustomTableCell>);
                      case "watch":
                        return (<CustomTableCell align={"center"} key={index}>
                          <Link to={`/battle_result/${row.battle_id}`}>{row[element]}</Link>
                        </CustomTableCell>);

                      default:
                        return (<CustomTableCell align={"center"} key={index}>
                          {row[element]}
                        </CustomTableCell>)
                    }
                  })
                }</TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{height: 48 * emptyRows}}>
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.array.isRequired,
  handleSpecify: PropTypes.func,
};

export default withStyles(styles)(CustomPaginationActionsTable);
