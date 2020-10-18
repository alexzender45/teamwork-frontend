import React from 'react';
import Toolbar from './header'
import Typography from '@material-ui/core/Typography';
import './gift.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';



  
class GetById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            error:'',
            comment: [],
            comments:[],
            name:''
        }
        this.fetchBlogPost = this.fetchBlogPost.bind(this);
        this.getToken = this.getToken.bind(this);
        this.getToken2 = this.getToken2.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.addComment = this.addComment.bind(this);
        this.getComment = this.getComment.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this)
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }
    getToken2() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('user_id')
    }
    fetchBlogPost() {
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
        return fetch('https://teamwork-platform.herokuapp.com/api/v1/articles/' + this.props.match.params.article_id, {
            method: 'GET',
            headers
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    this.setState({ article: json.data.rows[0] })
                } else if (json.status === "error") {
                    console.log(json.error)
                    this.props.history.push('/');
                }
            })
    }
    deleteData() {
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
     fetch('https://teamwork-project.herokuapp.com/api/v1/articles/' + this.props.match.params.article_id, {
          method: 'DELETE',
          headers
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === "success"){
                this.props.history.push('/articles');
            }else if(json.status === "error"){
                this.setState({ error: 'Not Allow To Delete Someones Post' })
                console.log("Not Allow")
            }
        });

      }
    componentDidMount() {
        this.fetchBlogPost();
        this.getComment();
    }
    componentDidUpdate(){
        this.getComment()
    }

    onChangeComment(event){
        this.setState({ comment: event.target.value });   
    }

    addComment(e) {
        e.preventDefault()
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
     fetch(`https://teamwork-project.herokuapp.com/api/v1/articles/${this.props.match.params.article_id}/comment`, {
         headers,
          method: 'POST',
          body: JSON.stringify({
            'comment': this.state.comment,
        }),
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === "Success"){
                this.setState({comment: json.data.comment})
            }else if(json.status === "error"){
                console.log(json.error)
            }
        });
      }


      // get comment
      getComment() {
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
     fetch(`https://teamwork-project.herokuapp.com/api/v1/articles/${this.props.match.params.article_id}/comment`, {
         headers,
          method: 'GET',
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === "Success"){
                this.setState({comments: json.data.comment})
            }else if(json.status === "error"){
                console.log(json.error)
            }
        });

      }

    
   
    render() {
        return (
            <main>
            <Toolbar />
            <div className = "container">
                <Typography component="h2" variant="h1" id = "title">
                {this.state.article.title}
                </Typography>
                <div className = "Box-2" id = 'image'>
                </div>
                <div className = "Box-3" id = "articles">
                    {this.state.article.article}
                    <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            id='submit'
                        >
                        <Link to={`/articleEdit/${this.state.article.article_id}`}>Edit</Link>

                        </Button>


                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            id='submit'
                            onClick={this.deleteData}
                        >
                        DELETE
                        </Button>
                        <Typography>
                            {this.state.error}
                            </Typography>
                </div>
                <form onSubmit={this.addComment}>
                <TextField id="filled-basic" label="comments" variant="filled" onChange = {this.onChangeComment} />
                <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                        Add Comment
                        </Button>
                </form>
                {this.state.comments.map(show => (<div key={show.comment_id}>
                <div className = "showcomment">
                <p><span id = "style">T</span><span id = "maincomment">{show.comment}</span></p>
                    </div>
                    </div>))}
            </div>
            </main>
        )
    }
}

export default GetById