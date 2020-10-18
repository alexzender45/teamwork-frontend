import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Toolbar from './header'



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
        fetch('https://teamwork-platform.herokuapp.com/api/v1/articles', {
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
            <div>
                <Toolbar />
                {this.state.isLoading}
                {this.state.article.map(show => (<div key={show.article_id}><h1>
                    <Link to={`/articlesby/${show.article_id}`}>{show.title}</Link></h1>
                    <p>{show.article_id}</p>
                    {show.article}</div>))}

            </div>
        )
    }
}

export default ArticleById