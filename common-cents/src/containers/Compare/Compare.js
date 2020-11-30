import React, { Component } from 'react';
import CompareItems from '../../components/CompareItems/CompareItems';
import classes from './Compare.module.css';
import axios from '../../axios-budget';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class Compare extends Component {
    state= {
        budget1: null,
        budget2: null,
        totalDifference: null,
        error: false
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        if (token) {
            this.props.onAutoSignIn(token, userId, userName)
        }
    }

    fetchMonthBudget = (month, id, token, userId) => {
        this.setState({error: null})
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get(`/${month}.json` + queryParams)
            .then(res => {
                console.log(res.data)
                const fetchedBudget = []
                for (let key in res.data) {
                    fetchedBudget.push({
                        ...res.data.[key].budget,
                        id: key,
                        month: month
                    })
                }
                this.setState({[id]: fetchedBudget})
                
            })
            .catch(error => {
                this.setState({error: error.response.data.error})
            })
}

    calculateBudget = () => {
        console.log(this.state.budget1[0])
        let totalDifference = [];
        const budget1Array = this.state.budget1[0];
        const budget2Array = this.state.budget2[0];
        if (budget1Array && budget2Array) {
            totalDifference.push(budget2Array.total - budget1Array.total);
 
            }
            this.setState({totalDifference: totalDifference})
        } 

        
    
    

    render () {
        let compareStatement;
        if (this.state.totalDifference) {
            compareStatement = <p
                className={this.state.totalDifference > 0 ? classes.greater : classes.less}>
                You saved ${this.state.totalDifference[0].toFixed(2)} in {this.state.budget2[0].month} compared to {this.state.budget1[0].month}</p>
        } else {
            compareStatement = '';
        }
        let errorMessage = null;
        
        if (this.state.error === 'Could not parse auth token.') {
            errorMessage = <p className={classes.error}>Please sign up or log in to continue.</p>
        } else if (this.state.error === 'Permission denied') {
            errorMessage = <p className={classes.error}>You do not have any saved data for this month.</p>
        }
        

        return (
            <div>
                {errorMessage}
                <div className={classes.CompareContainer}>
                    <CompareItems 
                        changed={(e) => this.fetchMonthBudget(e.target.value, 'budget1', this.props.token, this.props.userId)}
                        value={this.state.budget1}/>
                    <CompareItems 
                        changed={(e) => this.fetchMonthBudget(e.target.value, 'budget2', this.props.token, this.props.userId)}
                        value={this.state.budget2}/>
                    
                </div>
                <button className={classes.compareButton} onClick={this.calculateBudget}>Calculate</button>
                {compareStatement}
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

export default connect(mapStateToProps, mapDispatchToProps)(Compare);