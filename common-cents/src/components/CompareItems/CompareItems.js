import React from 'react';
import classes from './CompareItems.module.css'

const CompareItems = props => {
    return (
        <div className={classes.CompareItems}>
            <select onChange={props.changed}>
                <option disabled selected value>Select a month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">Septemer</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <div>
                <h3>Your spending:</h3>
                <p>Income: <span>{props.value ? '$' + props.value[0].income.toFixed(2) : 0}</span></p>
                <p>Housing: <span>{props.value ? '$' + (props.value[0].housing * -1).toFixed(2) : 0}</span></p>
                <p>Utilities: <span>{props.value ? '$' + (props.value[0].utilities * -1).toFixed(2) : 0}</span></p>
                <p>Groceries: <span>{props.value ? '$' + (props.value[0].groceries * -1).toFixed(2) : 0}</span></p>
                <p>Debt Payments: <span>{props.value ? '$' + (props.value[0].debt * -1).toFixed(2) : 0}</span></p>
                <p>Entertainment: <span>{props.value ? '$' + (props.value[0].entertainment * -1).toFixed(2) : 0}</span></p>
                <p>Vacations/Travel: <span>{props.value ? '$' + (props.value[0].vacation * -1).toFixed(2) : 0}</span></p>
            </div>
            <h3>
                Your total savings: {props.value ? '$' + props.value[0].total.toFixed(2) : 0}</h3>
        </div>
    )
}

export default CompareItems