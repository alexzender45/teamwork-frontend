import React from 'react';
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

const styles = {
    MDBInput: {
        fontSize: 100, //works!
    }
}

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            article: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeArticle = this.onChangeArticle.bind(this);
        this.handleChangeTitle = this.onChangeTitle.bind(this);
        this.getToken = this.getToken.bind(this)
    }

    onChangeTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    onChangeArticle(event) {
        this.setState({ article: event.target.value });
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
        fetch('https://teamwork-project.herokuapp.com/api/v1/articles', {
            headers,
            method: 'POST',
            body: JSON.stringify({
                'title': this.state.title,
                'article': this.state.article
            }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    console.log(json.data.title)
                } else if (json.status === "error") {
                    console.log(json.error)
                }
            })
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
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Article Title"
                            name="title"
                            autoComplete="title"
                            onChange={this.onChangeTitle}
                            autoFocus
                        />
                        <MDBInput
                            variant="outlined"
                            margin="normal"
                            required
                            type="textarea"
                            label="Write Article"
                            inputProps={styles.MDBInput}
                            rows={6}
                            col="40"
                            icon="icon_prefix"
                            onChange={this.onChangeArticle}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Upload
          </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default Article