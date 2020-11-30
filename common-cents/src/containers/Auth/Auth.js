import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Auth.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class Auth extends Component {
    state = {
        controls: {
            email: {
                type: 'email',
                placeholder: 'Enter your email',
                value: ''
            },
            password: {
                type: 'password',
                placeholder: 'Enter your password',
                value: ''
            }

        },
        loggingIn: false,
        loading: false,
        error: null
    }

    switchSignInHandler = () => {
        this.setState({loggingIn: !this.state.loggingIn})
    }

    onInputChangeHandler = (e, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value
            }
        }
        this.setState({controls: updatedControls})
    }

    signInHandler = (e, email, password) => {
        e.preventDefault();
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = '';
        if (this.state.loggingIn) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMjt2Tvr3AzP1099hZ5MdOvmUAd3RY3w4'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMjt2Tvr3AzP1099hZ5MdOvmUAd3RY3w4'
        }
        this.setState({loading: true})
        axios.post(url, authData)
            .then(response => {
                this.setState({loading: false});
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('userName', response.data.email);
                this.props.onSignIn(response.data.email, response.data.idToken, response.data.localId);
            })
            .catch(error => {
                this.setState({loading: false, error: error.response.data.error.message})
            })
        const updatedControls = {
            ...this.state.controls,
            email: {
                    ...this.state.controls.email,
                    value: ''
                },
            password: {
                ...this.state.controls.password,
                value: ''
                }
            }
            this.setState({controls: updatedControls})
    }

    render () {
        const formArray = [];
        for (let key in this.state.controls) {
            formArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formArray.map(element => {
            return (
                <input 
                    id={element.id}
                    type={element.config.type}
                    placeholder={element.config.placeholder}
                    value={element.config.value}
                    onChange={(e) => this.onInputChangeHandler(e, element.id)}>
                </input>)
        })
        let icon = this.state.loading 
            ? <FontAwesomeIcon icon={faSpinner} className="fa-pulse" size="4x" /> 
            : <FontAwesomeIcon icon={faUser} size="4x" />;
        
            let errorMessage = null;

            if (this.state.error === 'EMAIL_EXISTS') {
                errorMessage = <p className={classes.error}>An account with this email already exists. Please log in.</p>
            } else if (this.state.error === 'INVALID_EMAIL') {
                errorMessage = <p className={classes.error}>The email is invalid.</p>
            } else if (this.state.error === 'INVALID_PASSWORD') {
                errorMessage = <p className={classes.error}>The password is incorrect. Password must be at least 6 characters.</p>
            } else if (this.state.error === 'EMAIL_NOT_FOUND') {
                errorMessage = <p className={classes.error}>There is no account for this email address.</p>
            }
        
        let authRedirect = null;

        if (this.props.isAuth) {
            authRedirect = <Redirect to="/" />
        }
        
        return (
            <div>
                {authRedirect}
                <form className={classes.Auth}>
                    {icon}
                    {form}
                    {errorMessage}
                    <button 
                        onClick={(e) => this.signInHandler(e, this.state.controls.email.value, this.state.controls.password.value)}>
                            {this.state.loggingIn ? 'Log in' : 'Sign up'}</button>
                    <p className={classes.signin} onClick={this.switchSignInHandler}>{this.state.loggingIn ? 'Sign up' : 'Log in'}</p>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignIn: (userName, token, userId) => dispatch({
            type: actionTypes.SIGNIN, 
            userName: userName,
            token: token,
            userId: userId})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
