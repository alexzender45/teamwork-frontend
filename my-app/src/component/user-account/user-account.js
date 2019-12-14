import React from 'react';
import decode from 'jwt-decode';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toolbar from './header';
import './user-account.css'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            gender: '',
            job_role: '',
            department: '',
            address: '',
            first_nameError: '',
            last_nameError: '',
            emailError: '',
            passwordError: '',
            genderError: '',
            job_roleError: '',
            departmentError: '',
            addressError: '',
            serverError: ''
        }
        this.handleInput1 = this.handleInput1.bind(this);
        this.handleInput2 = this.handleInput2.bind(this);
        this.handleInput3 = this.handleInput3.bind(this);
        this.handleInput4 = this.handleInput4.bind(this);
        this.handleInput5 = this.handleInput5.bind(this);
        this.handleInput6 = this.handleInput6.bind(this);
        this.handleInput7 = this.handleInput7.bind(this);
        this.handleInput8 = this.handleInput8.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateGender = this.validateGender.bind(this);
        this.validateJobRole = this.validateJobRole.bind(this);
        this.validateDepartment = this.validateDepartment.bind(this);
        this.validateAddress = this.validateAddress.bind(this);
        this.getToken = this.getToken.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
        this.isTokenExpired = this.isTokenExpired.bind(this);
        this.formRef = null
    }


    handleInput1(event) {
        this.setState({ first_name: event.target.value }, () => {
            this.validateFirstName();
        });
    }
    handleInput2(event) {
        this.setState({ last_name: event.target.value }, () => {
            this.validateLastName()
        });
    }
    handleInput3(event) {
        this.setState({ email: event.target.value }, () => {
            this.validateEmail()
        });
    }
    handleInput4(event) {
        this.setState({ password: event.target.value }, () => {
            this.validatePassword()
        });
    }
    handleInput5(event) {
        this.setState({ gender: event.target.value }, () => {
            this.validateGender()
        });
    }
    handleInput6(event) {
        this.setState({ job_role: event.target.value }, () => {
            this.validateJobRole()
        });
    }
    handleInput7(event) {
        this.setState({ department: event.target.value }, () => {
            this.validateDepartment()
        });
    }
    handleInput8(event) {
        this.setState({ address: event.target.value }, () => {
            this.validateAddress()
        });
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

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }
    validateFirstName = () => {
        const { first_name } = this.state;
        if (first_name === '') {
            this.setState({
                first_nameError: 'First Name cannot be empty'
            });
        } else if (first_name !== '') {
            this.setState({
                first_nameError: ''
            });
        }
    }

    validateLastName = () => {
        const { last_name } = this.state;
        if (last_name === '') {
            this.setState({
                last_nameError: 'Last Name cannot be empty'
            });
        } else if (last_name !== '') {
            this.setState({
                last_nameError: ''
            });
        }
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
        if (password === '') {
            this.setState({
                passwordError: 'password cannot be empty'
            });
        } else if (password !== '') {
            this.setState({
                passwordError: ''
            });
        }
    }
    validateGender = () => {
        const { gender } = this.state;
        if (gender === '') {
            this.setState({
                genderError: ' Please input Gender'
            });
        } else if (gender !== '') {
            this.setState({
                genderError: ''
            });
        }
    }
    validateJobRole = () => {
        const { job_role } = this.state;
        if (job_role === '') {
            this.setState({
                job_roleError: 'Job Role cannot be empty'
            });
        } else if (job_role !== '') {
            this.setState({
                job_roleError: ''
            });
        }
    }
    validateDepartment = () => {
        const { department } = this.state;
        if (department === '') {
            this.setState({
                departmentError: 'Department cannot be empty'
            });
        } else if (department !== '') {
            this.setState({
                departmentError: ''
            });
        }
    }

    validateAddress = () => {
        const { address } = this.state;
        if (address === '') {
            this.setState({
                addressError: 'Address cannot be empty'
            });
        } else if (address !== '') {
            this.setState({
                addressError: ''
            });
        }
    }
    // Submit
    handleSubmit = e => {
        this.loggedIn();
        const headers = new Headers({
            'Content-type': 'application/json',
            token: this.getToken()
        })
        fetch('https://teamwork-project.herokuapp.com/api/v1/auth/create_user', {
            headers,
            method: "POST",
            body: JSON.stringify({
                'first_name': this.state.first_name,
                'last_name': this.state.last_name,
                'email': this.state.email,
                'password': this.state.password,
                'gender': this.state.gender,
                'job_role': this.state.job_role,
                'department': this.state.department,
                'address': this.state.address
            }),

        })
            .then(res => res.json())
            .then(json => {
                if (json.status === 'success') {
                    localStorage.setItem('token2', json.data.token);
                    console.log(localStorage.getItem('token2'))

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


    render() {
        return (
            <div class= 'na'>
            <Toolbar />
            <Container className="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <div className="icon">
                        <p style={error}>{this.state.serverError}</p>
                        <Avatar className={classes.avatar} id='icon'>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" id='account'>
                            Sign Up
        </Typography>
                    </div>
                    <form ref={(ref) => this.formRef = ref} onSubmit={this.handleSubmit} className={classes.form} noValidate >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="FirstName"
                            name="first_name"
                            autoComplete="first_name"
                            onBlur={this.validateFirstName}
                            onChange={this.handleInput1}
                            autoFocus
                        />
                        <p style={error}>{this.state.first_nameError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            name="last_name"
                            label="LastName"
                            type="last_name"
                            onBlur={this.validateLastName}
                            onChange={this.handleInput2}
                        />
                        <p style={error}>{this.state.last_nameError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onBlur={this.validateEmail}
                            onChange={this.handleInput3}

                        />
                        <p style={error}>{this.state.emailError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            onBlur={this.validatePassword}
                            onChange={this.handleInput4}
                            autoComplete="password"
                        />
                        <p style={error}>{this.state.passwordError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="gender"
                            label="Gender"
                            name="gender"
                            onBlur={this.validateGender}
                            autoComplete="gender"
                            onChange={this.handleInput5}

                        />
                        <p style={error}>{this.state.genderError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="job_role"
                            label="JobRole"
                            name="job_role"
                            autoComplete="job_role"
                            onBlur={this.validateJobRole}
                            onChange={this.handleInput6}

                        />
                        <p style={error}>{this.state.job_roleError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="department"
                            label="Department"
                            name="department"
                            autoComplete="department"
                            onBlur={this.validateDepartment}
                            onChange={this.handleInput7}

                        />
                        <p style={error}>{this.state.departmentError}</p>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            onBlur={this.validateAddress}
                            onChange={this.handleInput8}
                            autoComplete="address"
                        />
                        <p style={error}>{this.state.addressError}</p>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
          </Button>
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
export default Signup