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
            message: '   ',
            loggedIn: false
        }
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

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
                .then(res => {
                    console.log(`res.data`, res.data.user)
                    this
                        .props
                        .setUser(res.data.user)
                    this.setState({
                        username: '',
                        fullName: '',
                        email: '',
                        password: '',
                        verifyPassword: '',
                        message: 'Registration Successful',
                        loggedIn: true
                    })
                })
                .catch(err => {
                    console.log(`error registering user`, err)
                    this.setState({message: 'username already exists.'})
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

        return (
            <div className="auth" id="register">
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
            </div>
        )
    }
}

export default RegisterUser