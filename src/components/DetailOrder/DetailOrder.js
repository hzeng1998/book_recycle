import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import connect from "react-redux/es/connect/connect";
import {setErrorMessage, uploadOrders} from "../../actions";
import {withStyles} from "@material-ui/core";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const currencies = [
  {value: 0, label: '求购',},
  {value: 1, label: '出售',}
];

const types = [
  {value: 0, label: '文学'},
  {value: 1, label: '教育'},
  {value: 2, label: '科学'},
  {value: 3, label: '计算机'},
  {value: 4, label: '艺术'},
  {value: 5, label: '经管'}
];

const fin = [
  {value: 3, label: '3成新'},
  {value: 5, label: '5成新'},
  {value: 7, label: '7成新'},
  {value: 9, label: '9成新'},
  {value: 9.5, label: '9.5成新'},
  {value: 10, label: '全新'}
];


const styles = theme => ({
  storage: {
    padding: theme.spacing.unit * 3,
    width: "100%",
    height: '1066px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  textField: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  }
});

class DetailOrder extends React.Component {

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
      isbn: ''
    };
    this.inputRef = React.createRef();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    if (!!this.state.writer &&
      !!this.state.src &&
      !!this.state.title &&
      !!this.state.intro &&
      !!this.state.url &&
      !!this.state.isbn) {

      let {src, order_type, title, intro, writer, price, fineness, url, type, isbn} = this.state;

      let data = new FormData();
      data.append('src', src);
      data.append('order_type', order_type);
      data.append('title', title);
      data.append('intro', intro);
      data.append('price', price);
      data.append('writer', writer);
      data.append('fineness', fineness);
      data.append('url', url);
      data.append('type', type);
      data.append('isbn', isbn);
      console.log(data);

      this.props.uploadOrders(data);

      if (this.props.isFetching === false) {
        this.props.getMyOrders();
      }
    }
    else {
      console.log(this.state);
      this.props.setErrorMessage("Please Complete All of the Required Information");
    }
  };

  uploadImage = (e) => {
    console.log("upload file " + e.target.files[0]);
    console.log("file name:", e.target.files[0].name);
    this.setState({src: e.target.files[0], file: e.target.files[0].name});
  };

  componentDidUpdate = (prevProps) => {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({...this.props.data});
    }
  };

  render() {
    const {classes} = this.props;
    const {submit} = this.props.data;
    let {file, order_type, title, intro, writer, price, fineness, url, type, isbn} = submit ? this.state : this.props.data;
    return (
      <Grid item xs={12} sm={10} md={6} container>
        <Paper className={classes.storage}>
          <Typography variant={"h5"}>{"订单详情"} </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container justify={'space-between'}>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!submit}
                  id="title"
                  label="书名"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  type={"string"}
                  value={title}
                  onChange={this.handleChange("title")}
                  helperText="注:(请输入完整的书名，不需要书名号)"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  disabled={!submit}
                  id="writer"
                  label="作者"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  type={"string"}
                  value={writer}
                  onChange={this.handleChange("writer")}
                  helperText="请输入作者名，多位作者，逗号分隔"
                />
              </Grid>
            </Grid>
            <Grid container justify={'space-between'}>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!submit}
                  id="isbn"
                  label="ISBN"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  type={"string"}
                  value={isbn}
                  onChange={this.handleChange("isbn")}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  disabled={!submit}
                  id="order_type"
                  select
                  label="select book type"
                  className={classes.textField}
                  value={type}
                  onChange={this.handleChange('type')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="请选择书籍类型"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {types.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container justify={'space-between'}>
              <Grid item xs={12} sm={6}>
                <TextField
                  disabled={!submit}
                  id="price"
                  label="价格"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  type={"number"}
                  value={price}
                  onChange={this.handleChange("price")}
                  helperText="请输入价格"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  disabled={!submit}
                  id="order_type"
                  select
                  label="select order type"
                  className={classes.textField}
                  value={order_type}
                  onChange={this.handleChange('order_type')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="请选择订单类型"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {currencies.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                disabled={!submit}
                id="fineness"
                select
                label="书籍成色"
                className={classes.textField}
                value={fineness}
                onChange={this.handleChange('fineness')}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="请选择成色"
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {fin.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                disabled={!submit}
                id="url"
                label="外链"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                type={"url"}
                value={url}
                onChange={this.handleChange("url")}
                helperText="请添加相关展示外链"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <input type="file" name="profileImage" onChange={this.uploadImage}
                     style={{display: 'none'}}
                     ref={this.inputRef}/>
              <TextField
                disabled={!submit}
                id="src"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                type={"button"}
                value={file}
                onClick={() => this.inputRef.current.click()}
                helperText="上传封面"
              />
            </Grid>
            <Grid item xs={12} sm={11}>
              <TextField
                disabled={!submit}
                id="intro"
                label="简介"
                multiline
                rows="10"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                value={intro}
                onChange={this.handleChange('intro')}
                fullWidth
              />
            </Grid> {
            submit ?
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {"上传"}
              </Button> : null
          }
          </form>
        </Paper>
        <ErrorMessage/>
      </Grid>
    )
  }
}

export default connect(() => ({}), {
  uploadOrders,
  setErrorMessage
})(withStyles(styles)(DetailOrder));