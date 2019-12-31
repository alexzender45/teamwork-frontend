import React from 'react';
import decode from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from './header'
import './style.css'
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" id="copyright">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Team Work
  </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const classes = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            serverError: ''

        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getToken = this.getToken.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
        this.isTokenExpired = this.isTokenExpired.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.formRef = null;
    }

    // Email
    handleEmail = event => {
        this.setState({ email: event.target.value }, () => {
            this.validateEmail()
        });
    }

    // Password
    handlePassword = event => {
        this.setState({ password: event.target.value }, () => {
            this.validatePassword()
        })
    }
    validateEmail = () => {
        const { email } = this.state;
        if (email === '') {
            this.setState({
                emailError: 'Email cannot be empty'
            });
        } else if (email !== '') {
            this.setState({
                emailError: ''
            });
        }
    }
    validatePassword = () => {
        const { password } = this.state;
        if (password === '' && password.length < 4) {
            this.setState({
                passwordError: 'Password cannot be empty'
            });
        } else if (password !== '') {
            this.setState({
                passwordError: ''
            });
        }
    }
    // Submit
    handleSubmit = e => {
        this.setState({
            email: '', password: ''

        })
        fetch('https://teamwork-project.herokuapp.com/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.status === 'success') {
                    localStorage.setItem('token', json.data.token);
                    localStorage.setItem('user_id', json.data.user_id);
                    console.log(localStorage.getItem('token'))
                    console.log(localStorage.getItem('user_id'))
                    this.props.history.push('/articles');
                } else if (json.status === 'error') {
                    this.setState({
                        serverError: json.error
                    })
                    console.log(json.error);
                }
            })
        e.preventDefault();
        this.formRef.reset();
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token','user_id')
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
    }

    render() {
        return (
            <div>
                < Toolbar />
            <Container className="main" maxWidth="xs" >
                <div className={classes.paper}>
                    <div className="icon">
                        <Avatar className={classes.avatar} id='icon'>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography className="h1" variant="h5">
                            Login In
        </Typography>
                    </div>
                    <form ref={(ref) => this.formRef = ref} onSubmit={this.handleSubmit} className={classes.form} noValidate >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onBlur={this.validateEmail}
                            onChange={this.handleEmail}
                            autoFocus
                        />
                        <p style={error}>{this.state.emailError}</p>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onBlur={this.validatePassword}
                            onChange={this.handlePassword}
                            autoComplete="current-password"
                        />
                        <p style={error}>{this.state.passwordError}</p>
                        <p style={error}>{this.state.serverError}</p>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            id='submit'
                        >
                            Sign In
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
            </div>
        )
    }
}
const error = {
    color: 'red'
}
export default Login