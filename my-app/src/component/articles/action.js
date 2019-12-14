import React from 'react';

class GetById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: []
        }
        this.fetchBlogPost = this.fetchBlogPost.bind(this);
        this.getToken = this.getToken.bind(this)
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }
    fetchBlogPost() {
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
        return fetch('https://teamwork-project.herokuapp.com/api/v1/articles/' + this.props.match.params.article_id, {
            method: 'GET',
            headers
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    this.setState({ article: json.data.rows[0] })
                    console.log(json.data.rows)
                } else if (json.status === "error") {
                    console.log(json.error)
                }
            })
    }
    componentDidMount() {
        this.fetchBlogPost();
    }
    render() {
        return (
            <div>
                <p>{this.state.article.title}</p>

            </div>
        )
    }
}

export default GetById