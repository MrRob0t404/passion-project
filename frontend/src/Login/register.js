import React from 'react';
import axios from 'axios';
import {Route, Link, Switch, Redirect} from 'react-router-dom';

import Style from '.././CSS/style.css'

class RegisterUser extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            username: '',
            password: '',
            verifyPassword: '',
            email: '',
            message: '',
            loggedIn: false
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Checks wether the required user inputs are valid. If yes, the axios call is
    // made
    handleRegisterButton = e => {
        e.preventDefault()
        const {fullName, username, password, verifyPassword, email} = this.state;
        if (!fullName || !username, !password || !verifyPassword, !email) {
            this.setState({message: 'Please fill out all fields.'})
        } else if (username.length < 4 || password.length < 4) {
            this.setState({message: 'Username and Password must be at least 4 characters.'})
        } else if (password !== verifyPassword) {
            this.setState({message: 'Passwords do not match.'})
        } else {
            axios
                .post('/users/new', {
                username: username,
                password: password,
                email: email,
                fullName: fullName
            })
                .then(() => {
                    axios.post("/users/login", {
                        username: username,
                        password: password
                    }).then(res => {
                        console.log(`res`, res)
                        this
                            .props
                            .setUser(res.data.user)
                    }).catch(err => {
                        console.log(err)
                        this.setState({message: 'Error logging in'})
                    })

                })
                .catch(err => {
                    console.log(`this is your`, err)
                    this.setState({
                        email: '',
                        password: '',
                        verify_password: '',
                        location: '',
                        first_name: '',
                        last_name: '',
                        phone_number: '',
                        profile_pic: '',
                        message: 'Something went wrong'
                    })
                })
        }
    }

    render() {
        const {
            message,
            fullName,
            email,
            password,
            verifyPassword,
            username,
            loggedIn
        } = this.state

        console.log(this.state)
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form">
                            <span className="login100-form-logo">
                                <i className="zmdi zmdi-landscape"></i>
                            </span>

                            <span className="login100-form-title p-b-34 p-t-27">
                                Register
                            </span>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="text"
                                    name="fullName"
                                    placeholder="Name"
                                    onChange={this.handleInput}/>
                                <span className="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.handleInput}/>
                                <span className="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={this.handleInput}/>
                                <span className="focus-input100" data-placeholder="&#xf207;"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.handleInput}/>
                                <span className="focus-input100" data-placeholder="&#xf191;"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <input
                                    className="input100"
                                    type="password"
                                    name="verifyPassword"
                                    placeholder="Confirm Password"
                                    onChange={this.handleInput}/>
                                <span className="focus-input100" data-placeholder="&#xf191;"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" onClick={this.handleRegisterButton}>
                                    Register
                                </button>
                            </div>

                            <div className="text-center p-t-90">
                                <Link to='/login'>
                                    Already a Memeber?
                                </Link>

                            </div>
                        </form>
                        <div id='errorMessage'>
                            {this.state.message}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default RegisterUser

{/* <div className="auth" id="register">
<div className="auth-container" id="register-container">
    <h2>Note cloud</h2>
    <form>
        <input
            className='loginInput'
            name="fullName"
            placeholder="Full Name"
            type="text"
            onChange={this.handleInput}
            value={fullName}/>
        <input
            className='loginInput'
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleInput}
            value={email}/>
        <input
            className='loginInput'
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleInput}
            value={username}/>
        <input
            className='loginInput'
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleInput}
            value={password}/>
        <input
            className='loginInput'
            name="verifyPassword"
            type="password"
            placeholder="Re-enter Password"
            onChange={this.handleInput}
            value={verifyPassword}/>
        <input
            className='loginInput'
            type="submit"
            className="auth-button"
            onClick={this.handleRegisterButton}value="Register"/>
    </form>
    <p>{" "}
        Already a TyroDev member?
        <Link to='/login'>
            Login
        </Link>
    </p>
    <p>{message}</p>
</div>
</div> */
}