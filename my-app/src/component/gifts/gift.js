import React from 'react';
import FormData from 'form-data';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import classes from './style'
import Container from '@material-ui/core/Container';



class Gift extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getToken = this.getToken.bind(this)
    }

    onChangeFile = (event) => {
        this.setState({ image: event.target.image[0] })
    }

    handleChange(event) {
        this.setState({ title: event.target.value });
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    handleSubmit = (e, form) => {
        e.preventDefault();
        const headers = new Headers({
            'Content-Type': 'multipart/form-data',
            token: this.getToken(),
            mode: "no-cors",
        })
        const formData = new FormData()
        formData.append('title', this.state.title);
        formData.append('file', this.state.image);
        return fetch('https://teamwork-project.herokuapp.com/api/v1/gifts', {
            method: 'POST',
            body:({formData}),
            headers,
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === "success") {
                    console.log('good')
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
                        Sign in
        </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Gift Title"
                            name="title"
                            autoComplete="title"
                            onChange={this.handleChange}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="file"
                            name="image"
                            onChange={this.onChangeFile}
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

export default Gift