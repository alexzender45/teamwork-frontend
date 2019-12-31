import React from 'react';
import Toolbar from './header'
import Typography from '@material-ui/core/Typography';
import './actions.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



  
class GetGiftById extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gift: [],
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
        return fetch('https://teamwork-project.herokuapp.com/api/v1/gifts/' + this.props.match.params.gift_id, {
            method: 'GET',
            headers
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    this.setState({ gift: json.data.rows[0] })
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
     fetch('https://teamwork-project.herokuapp.com/api/v1/gifts/' + this.props.match.params.gift_id, {
          method: 'DELETE',
          headers
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === "success"){
                this.props.history.push('/gifts');
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
     fetch(`https://teamwork-project.herokuapp.com/api/v1/gifts/${this.props.match.params.gift_id}/comment`, {
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
     fetch(`https://teamwork-project.herokuapp.com/api/v1/gifts/${this.props.match.params.gift_id}/comment`, {
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
                {this.state.gift.title}
                </Typography>
                <div  id = "gift">
                    <img id ="img" src = {this.state.gift.image_url} alt = "Something is wrong Please reload"/>
                    </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            id='submitform'
                            onClick={this.deleteData}
                        >
                        DELETE
                        </Button>
                        <Typography>
                            {this.state.error}
                            </Typography>
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
                <p><span id = "styles">T</span><span id = "maincomments">{show.comment}</span></p>
                    </div>
                    </div>))}
            </div>
            </main>
        )
    }
}

export default GetGiftById