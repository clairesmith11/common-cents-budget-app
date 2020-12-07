import React, { useState } from 'react';
import classes from './Navigation.module.css';
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

const Navigation = props => {
    const [showing, setShowing] = useState(false);

    const showNavPanel = () => {
        setShowing(!showing);
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        props.onLogout();
        showNavPanel();
        setShowing(false);
        localStorage.removeItem('appState');
    }

        const user = props.isAuth ? 
        (<div className={classes.user}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <p>{props.userName}</p>
        </div>) 
        : null;

        const logoutLink = props.isAuth ?
            <Link to="/sign-in" onClick={logoutHandler}>Logout</Link> 
            : null;

        return (
            <div className={classes.topnav}>
                <img src={Logo} alt="Logo"/>
                    <div className={showing ? classes.show : classes.hide}>
                        <Link to="/" onClick={showNavPanel}>My Budget</Link>
                        <Link to="/compare" onClick={showNavPanel}>Compare</Link>
                        {!props.isAuth 
                            ? <Link to="/sign-in" onClick={showNavPanel}>Sign In</Link>
                            : null}
                        {logoutLink}
                    </div>
                <div className={classes.icon} >
                    {user}
                    <FontAwesomeIcon 
                        icon={faBars} 
                        className={classes.bars}
                        onClick={showNavPanel} 
                        size="2x" />
                </div>
          </div>
            
            
        )
    
    
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