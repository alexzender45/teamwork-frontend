
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Toolbar from '../header';
import Typography from '@material-ui/core/Typography';
import MainFeaturedPost from './main';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import FeaturedPost from './feature';
import './design.css';
import decode from 'jwt-decode';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" id="copyright">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Team Work
  </Link>{' '}
  <Link color="inherit" href="https://material-ui.com/">
                ABOUT US
  </Link>{' '}
  <Link color="inherit" href="https://material-ui.com/">
                CONTACT
  </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const mainFeaturedPost = {
    title: "View All Articles Posted In This Trend",
    description:
        "You Can Also Post Article Of Your Choices by Clicking The Button Below",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Post Article',
};

class ArticleById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            isLoading: false
        }
        this.getUser = this.getUser.bind(this);
        this.getToken = this.getToken.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
        this.isTokenExpired = this.isTokenExpired.bind(this);
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }
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
            this.props.history.push('/articles');
        } else if (!this.loggedIn()) {
            this.props.history.push('/');
        }
        this.getUser();
    }
    getUser() {
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
        fetch('https://teamwork-project.herokuapp.com/api/v1/articles', {
            headers,
            method: 'GET',
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    this.setState({ article: json.data.rows })
                    this.setState({ isLoading: true })
                    console.log(json.data.rows)
                } else if (json.status === "error") {
                    console.log(json.error)
                    this.props.history.push('/');
                }
            })

    }
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                < Toolbar />
                <Container maxWidth="lg">
                    <main className='main' >
                        <MainFeaturedPost post={mainFeaturedPost} />
                        <Grid container spacing={4}>
                            {this.state.article.map(post => (
                                <FeaturedPost key={post.title} post={post} />
                            ))}
                        </Grid>
                    </main>
                    <Box mt={8}>
                    <Copyright />
                </Box>
                </Container>
            </React.Fragment >
        );
    }
}

export default ArticleById