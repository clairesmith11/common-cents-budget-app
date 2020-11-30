import React, { Component } from 'react';
import classes from './Navigation.module.css';
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class Navigation extends Component {
    state = {
        showing: false
    }

    showNavPanel = () => {
        this.setState({showing: !this.state.showing})
    }

    logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        this.props.onLogout();
        this.showNavPanel();
        this.setState({showing: false})
        localStorage.removeItem('appState');
    }

    render () {
        const user = this.props.isAuth ? 
        (<div className={classes.user}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <p>{this.props.userName}</p>
        </div>) 
        : null;

        const logoutLink = this.props.isAuth ?
            <Link to="/sign-in" onClick={this.logoutHandler}>Logout</Link> 
            : null;

        return (
            <div className={classes.topnav}>
                <img src={Logo} alt="Logo"/>
                    <div className={this.state.showing ? classes.show : classes.hide}>
                        <Link to="/" onClick={this.showNavPanel}>My Budget</Link>
                        <Link to="/compare" onClick={this.showNavPanel}>Compare</Link>
                        {!this.props.isAuth 
                            ? <Link to="/sign-in" onClick={this.showNavPanel}>Sign In</Link>
                            : null}
                        {logoutLink}
                    </div>
                <div className={classes.icon} >
                    {user}
                    <FontAwesomeIcon 
                        icon={faBars} 
                        className={classes.bars}
                        onClick={this.showNavPanel} 
                        size="2x" />
                </div>
          </div>
            
            
        )
    }
    
}

const mapStateToProps = state => {
    return {
        isAuth: state.token !== null,
        userName: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actionTypes.LOGOUT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);