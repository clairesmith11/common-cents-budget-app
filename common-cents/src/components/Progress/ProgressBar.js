import React from 'react';
import classes from './ProgressBar.module.css';

const ProgressBar = props => {
    const value = props.goal ? props.total / props.goal : 0;
    return (
        <progress className={value >= 1 ? classes.Over : null} 
                            value={props.goal ? props.total / props.goal : 0}></progress>
    )
}

export default ProgressBar;