import React from 'react';
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
<<<<<<< HEAD
=======
import { MDBInput } from "mdbreact";
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import classes from './style'
import Container from '@material-ui/core/Container';
<<<<<<< HEAD
import decode from 'jwt-decode';
=======

const styles = {
    MDBInput: {
        fontSize: 100, //works!
    }
}
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b

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
<<<<<<< HEAD
        this.getToken = this.getToken.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
        this.isTokenExpired = this.isTokenExpired.bind(this);
        
=======
        this.getToken = this.getToken.bind(this)
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
    }

    onChangeTitle = (event) => {
        this.setState({ title: event.target.value })
    }

    onChangeArticle(event) {
        this.setState({ article: event.target.value });
<<<<<<< HEAD
        console.log("hiiiii")
=======
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }
<<<<<<< HEAD
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
    componentDidMount() {
        if (this.loggedIn()) {
            this.props.history.push('/post-article');
        } else if (!this.loggedIn()) {
            this.props.history.push('/');
        }
    }
=======

>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
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
<<<<<<< HEAD
                    this.props.history.push('/articles');
=======
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
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
<<<<<<< HEAD
                        <TextField
                           required
                           fullWidth
                           id="title"
                           label="Article Title"
                           name="title"
                           autoComplete="title"
                           onChange={this.onChangeArticle}
=======
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
>>>>>>> 933731246f993aa244da79ad50c64a1ab2c3851b
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