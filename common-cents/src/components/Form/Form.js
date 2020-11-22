import React from 'react';
import classes from './Form.module.css';

const Form = props => {
    return (
        <form className={classes.BudgetForm}>
            <label for="category">Category</label>
            <select name="category">
                <option disabled selected value>Select a category</option>
                <option value="income">Income</option>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="groceries">Groceries</option>
                <option value="debt">Debt Payments</option>
                <option value="entertainment">Entertainment</option>
                <option value="vacation">Vacations/Travel</option>
            </select>

            <label for="transaction">Transaction</label>
            <input type="text" name="transaction" id="transaction" placeholder="Enter transaction name" />
            <label for="amount">Amount</label>
            <input type="number" name="amount" id="amount" placeholder="Enter amount" />

            <input type="radio" id="income" name="type" value="income"/> 
            <label for="income">Income</label>
            <input type="radio" id="expense" name="type" value="expense"/>
            <label for="expense">Expense</label>
            <input type="submit" value="Add Transaction" onClick={props.clicked} />
        </form>
    )
}

export default Form;