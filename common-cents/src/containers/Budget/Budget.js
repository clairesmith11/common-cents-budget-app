import React, { Component } from 'react';
import classes from './Budget.module.css';
import BudgetCategory from '../../components/BudgetCategory/BudgetCategory';
import Modal from '../../UI/Modal/Modal';
import Form from '../../components/Form/Form';
import axios from '../../axios-budget';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';


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
        submitting: false,
        error: false,
        success: false,
        loading: false
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const appState = JSON.parse(localStorage.getItem('appState'))
        if (token) {
            this.props.onAutoSignIn(token, userId, userName)
        }
        if (appState !== null) {
            this.setState({budget: appState.budget})
            this.setState({incomeSubtotal: appState.incomeSubtotal})
            this.setState({housingSubtotal: appState.housingSubtotal})
            this.setState({utilitiesSubtotal: appState.utilitiesSubtotal})
            this.setState({groceriesSubtotal: appState.groceriesSubtotal})
            this.setState({debtSubtotal: appState.debtSubtotal})
            this.setState({entertainmentSubtotal: appState.entertainmentSubtotal})
            this.setState({vacationSubtotal: appState.vacationSubtotal})
            this.setState({total: appState.total})
        }
        
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
        this.setState({
                        budget: updatedBudget,
                        total: this.state.total + submittedTransaction.amount,
                        [key2]: this.state.[key2] + submittedTransaction.amount
                    }, this.saveToLocal);
        
        document.getElementById('transaction').value = '';
        document.getElementById('amount').value = '';
        
        
    }

    saveToLocal() {
        const local = this.state;
        localStorage.setItem('appState', JSON.stringify(local));
    }

    removeTransactionHandler = (id, category) => {
        localStorage.removeItem('appState')
        const subtotal = category + 'Subtotal';
        const deletedItem = this.state.budget.[category].filter(item => item.id === id);
        const deletedArray = this.state.budget.[category].filter(item => item.id !== id);

        const deletedBudget = {
            ...this.state.budget,
            [category]: deletedArray
        }
        this.setState({budget: deletedBudget,
                        total: this.state.total - deletedItem[0].amount,
                        [subtotal]: this.state.[subtotal] - deletedItem[0].amount},
                        this.saveToLocal)
        
        
                   
    }

    completeMonthHandler = () => {
        this.setState({
                        submitting: !this.state.submitting, 
                        error: null, 
                        success: null
                    })
        
    }

    submitMonthHandler = (token) => {
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
        const submission = {
            budget: budget,
            userId: this.props.userId 
        }
        const date = new Date();
        const month = 6;
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        this.setState({loading: true})
        axios.post(`/${months[month]}.json?auth=${token}`, submission)
            .then(res => {
                this.setState({success: true, loading: false})
                localStorage.removeItem('appState')
            })
            .catch(error => {
                console.log(error);
                this.setState({error: true, loading: false});
            })
        
        
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
                    submit={() => this.submitMonthHandler(this.props.token)}
                    total={this.state.total}
                    subtotals={subtotals}
                    error={this.state.error}
                    success={this.state.success}
                    loading={this.state.loading}/>
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

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignIn: (token, userId, userName) => dispatch({
            type: actionTypes.AUTOSIGNIN, 
            token: token,
            userId: userId,
            userName: userName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);