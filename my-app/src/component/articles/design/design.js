
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Toolbar from '../header';
import MainFeaturedPost from './main';
import FeaturedPost from './feature';
import './design.css';
import Footer from './footer'


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
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
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
                }
            })

    }
    componentDidMount() {
        this.getUser();
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
                                <FeaturedPost key={post.article_id}  post={post} />
                            ))}
                        </Grid>
                    </main>
                </Container>
           <Footer />
            </React.Fragment >
        );
    }
}

export default ArticleById