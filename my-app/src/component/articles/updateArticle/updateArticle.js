import React, { Component } from 'react';
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { MDBInput } from "mdbreact";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import classes from './style'
import Container from '@material-ui/core/Container';
import './style.css'


export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        article: '',
        error: ''
      }
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArticle = this.onChangeArticle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getToken = this.getToken.bind(this)
  }
  getToken() {
           // Retrieves the user token from localStorage
           return localStorage.getItem('token')
        }
  componentDidMount() {
    const headers = new Headers({
             'Content-type': 'application/json',
          token: this.getToken()
                 })
      fetch('https://teamwork-platform.herokuapp.com/api/v1/articles/' + this.props.match.params.article_id,{
          method: 'GET',
          headers
      })
      .then(res => res.json())
                  .then(json => {
                      if (json.status === "success") {
                          this.setState({ title: json.data.rows[0].title,
                                          article: json.data.rows[0].article
                         })
                          console.log(json.data.rows)
                      } else if (json.status === "error") {
                          console.log(json.error)
                          this.props.history.push('/');
                      }
    })
}

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeArticle(e) {
    this.setState({
      article: e.target.value
    })  
  }

  onSubmit(e) {
    e.preventDefault();
    const headers = new Headers({
      'Content-type': 'application/json',
   token: this.getToken()
          })
    const obj = {   
      title: this.state.title,
      article: this.state.article
    };
    return fetch('https://teamwork-platform.herokuapp.com/api/v1/articles/' + this.props.match.params.article_id,{
      headers,
     method: 'PATCH',
     body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(json => {
          if(json.status === "success"){
              this.props.history.push('/articles');
          }else if(json.status === "error"){
              this.setState({ error: 'Not Allow To Edit Someones Post' })
          }
      });
    
  }
 
  render() {
    return (
        <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                POST ARTICLES
</Typography>
            <form onSubmit={this.onSubmit} className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    name="title"
                    autoComplete="title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    autoFocus
                />
                <MDBInput
                    variant="outlined"
                    margin="normal"
                    required
                    type="textarea"
                    id="title2"
                    rows={6}
                    col="40"
                    icon="icon_prefix"
                    value={this.state.article}
                    onChange={this.onChangeArticle}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    POST
  </Button>
  <Typography>
    {this.state.error}
    </Typography>
            </form>
        </div>
    </Container>
    )
  }
}