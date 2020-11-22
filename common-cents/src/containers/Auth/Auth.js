import React, { Component } from 'react';
import classes from './Auth.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
        signIn: false
    }

    switchSignInHandler = () => {
        this.setState({signIn: !this.state.signIn})
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

    onSignIn = (e, email, password) => {
        e.preventDefault();
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMjt2Tvr3AzP1099hZ5MdOvmUAd3RY3w4', authData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
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
        return (
            <div>
                <form className={classes.Auth}>
                    <FontAwesomeIcon icon={faUser} size="4x" />
                    {form}
                    <button 
                        onClick={(e) => this.onSignIn(e, this.state.controls.email.value, this.state.controls.password.value)}>
                            {this.state.signIn ? 'Log in' : 'Sign up'}</button>
                    <p onClick={this.switchSignInHandler}>{this.state.signIn ? 'Sign up' : 'Log in'}</p>
                </form>
            </div>
        )
    }
}

export default Auth;