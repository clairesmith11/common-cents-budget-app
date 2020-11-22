import React, { Component } from 'react';
import classes from './Navigation.module.css';
import Logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    state = {
        showing: false
    }

    showNavPanel = () => {
        this.setState({showing: !this.state.showing})
    }

    render () {
        return (
            <div className={classes.topnav}>
                <img src={Logo} alt="Logo"/>
                    <div className={this.state.showing ? classes.show : classes.hide}>
                        <Link to="/" onClick={this.showNavPanel}>My Budget</Link>
                        <Link to="/compare" onClick={this.showNavPanel}>Compare</Link>
                        <Link to="/sign-in" onClick={this.showNavPanel}>Sign In</Link>
                    </div>
                <div className={classes.icon} onClick={this.showNavPanel}>
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </div>
          </div>
            
            
        )
    }
    
}

export default Navigation;