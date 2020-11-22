import React, { Component } from 'react';
import classes from './Budget.module.css';
import BudgetCategory from '../../components/BudgetCategory/BudgetCategory';
import Modal from '../../UI/Modal/Modal';
import Form from '../../components/Form/Form';
import axios from '../../axios-budget';

class Budget extends Component {
    state = {
        budget: {
            income: [],
            housing: [],
            utilities: [],
            groceries: [],
            debt: [],
            entertainment: [],
            vacation: []
        },
        incomeSubtotal: 0,
        housingSubtotal: 0,
        utilitiesSubtotal: 0,
        groceriesSubtotal: 0,
        debtSubtotal: 0,
        entertainmentSubtotal: 0,
        vacationSubtotal: 0,
        total: 0,
        submitting: false
    }

    addTransactionHandler = (e) => {
        e.preventDefault();
        const form = document.querySelector('form');
        const amount = form.elements[2].value;
        const submittedTransaction = {
            category: form.elements[0].value,
            name: form.elements[1].value,
            amount: form.elements[3].checked ? parseFloat(amount) : parseFloat(amount) * -1,
            income: form.elements[3].checked,
            expense: form.elements[4].checked,
            id: Math.random() * 1000

        }
        const key = submittedTransaction.category
        const key2 = submittedTransaction.category + 'Subtotal';
        const updatedBudget = {
            ...this.state.budget,
            [key]: this.state.budget.[key].concat(submittedTransaction)
        }
        this.setState({budget: updatedBudget});
        this.setState({total: this.state.total + submittedTransaction.amount});
        this.setState({[key2]: this.state.[key2] + submittedTransaction.amount})
        document.getElementById('transaction').value = '';
        document.getElementById('amount').value = '';
    }

    removeTransactionHandler = (id, category) => {
        const subtotal = category + 'Subtotal';
        const deletedItem = this.state.budget.[category].filter(item => item.id === id);
        const deletedArray = this.state.budget.[category].filter(item => item.id !== id);

        const deletedBudget = {
            ...this.state.budget,
            [category]: deletedArray
        }
        this.setState({budget: deletedBudget,
                        total: this.state.total - deletedItem[0].amount,
                        [subtotal]: this.state.[subtotal] - deletedItem[0].amount})
                   
    }

    completeMonthHandler = () => {
        this.setState({submitting: !this.state.submitting})
    }

    submitMonthHandler = () => {
        const budget = {
            total: this.state.total,
            income: this.state.incomeSubtotal,
            housing: this.state.housingSubtotal,
            utilities: this.state.utilitiesSubtotal,
            groceries: this.state.groceriesSubtotal,
            debt: this.state.debtSubtotal,
            entertainment: this.state.entertainmentSubtotal,
            vacation: this.state.vacationSubtotal
        }
        const date = new Date();
        const month = 10;
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        axios.post(`/${months[month]}.json`, budget)
            .then(res => console.log(res))
            .catch(error => console.log(error));
        
        this.setState({submitting: false})
    }


    render () {
        let date = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const budgetArray = [];
        for (let key in this.state.budget) {
            budgetArray.push({
                id: key,
                config: this.state.budget[key]
            });
        }
        let budgetCategories = budgetArray.map(element => {
            const subtotal = element.id + 'Subtotal' 
            return (
                <BudgetCategory
                    category={element.id}
                    subtotal={this.state.[subtotal]}
                    total={this.state.total}
                    budget={this.state.budget}
                    onButtonClick={this.removeTransactionHandler}/>
            )
        })
        
        
        const subtotals = [
            {category: 'housing', amount: this.state.housingSubtotal},
            {category: 'utilities', amount: this.state.utilitiesSubtotal},
            {category: 'groceries', amount: this.state.groceriesSubtotal},
            {category: 'debt', amount: this.state.debtSubtotal},
            {category: 'entertainment', amount: this.state.entertainmentSubtotal},
            {category: 'vacation', amount: this.state.vacationSubtotal}
        ]
        
        return (
            <div className={classes.Budget}>
                <Modal 
                    show={this.state.submitting} 
                    close={this.completeMonthHandler} 
                    submit={this.submitMonthHandler}
                    total={this.state.total}
                    subtotals={subtotals}/>
                <div className={classes.BudgetHeading}>
                    <h2>{months[date.getMonth()] + ' ' + date.getFullYear()}</h2>
                    <p>Monthly Total</p>
                    <h1>${this.state.total.toFixed(2)}</h1>
                    <button onClick={this.completeMonthHandler}>Complete Month</button>
                </div>
                
                <Form clicked={this.addTransactionHandler} />
                {budgetCategories}
                  
            </div>
        )
    }
}

export default Budget;