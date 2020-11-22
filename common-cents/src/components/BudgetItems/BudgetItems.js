import React from 'react';
import classes from './BudgetItems.module.css'

const BudgetItems = props => {
    if (props.heading === props.category) {
        return (
            <div className={classes.BudgetItems}>
                <p>{props.name}</p>
                <div className={classes.BudgetItemsAmount}>
                    <p className={props.income ? classes.inc : classes.exp}>
                        ${props.amount.toFixed(2)}</p>
                    <button onClick={props.clicked}>x</button>
                </div>
                
            </div>
        )
    } else {
        return null
    }
    
}

export default BudgetItems;