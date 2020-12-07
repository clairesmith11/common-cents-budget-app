import React, { useState } from 'react';
import classes from './Subtotal.module.css';
import ProgressBar from '../Progress/ProgressBar';

const Subtotal = props => {
    const [goal, setGoal] = useState(null);

const setGoalHandler = (e) => {
    setGoal(e.target.value);
}

    
    const subtotals = props.category === 'income' ? null : (
        <div>
            <div className={classes.SubtotalContainer}>
                <label>Set Goal:</label>
                <input type="number" onChange={setGoalHandler}></input>
                <p className={classes.Subtotal}>Subtotal: {'$' + props.subtotal.toFixed(2)} </p>  
            </div>
            <div className={classes.Percentage}>
                <ProgressBar goal={goal} total={props.subtotal > 0 ? props.subtotal : props.subtotal * -1} />
            </div>
                    
        </div>)
        return (
            <div>
                {subtotals}
            </div>
            
            
            
        )
    
}

export default Subtotal;