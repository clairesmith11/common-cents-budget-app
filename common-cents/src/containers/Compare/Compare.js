import React, { Component } from 'react';
import CompareItems from '../../components/CompareItems/CompareItems';
import classes from './Compare.module.css';
import axios from '../../axios-budget'

class Compare extends Component {
    state= {
        budget1: null,
        budget2: null,
        totalDifference: null
    }

    fetchMonthBudget = (month, id) => {
        axios.get(`/${month}.json`)
            .then(res => {
                const fetchedBudget = []
                for (let key in res.data) {
                    fetchedBudget.push({
                        ...res.data[key],
                        id: key,
                        month: month
                    })
                }
                this.setState({[id]: fetchedBudget})
                
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
        return (
            <div>
                <div className={classes.CompareContainer}>
                <CompareItems 
                    changed={(e) => this.fetchMonthBudget(e.target.value, 'budget1')}
                    value={this.state.budget1}/>
                <CompareItems 
                    changed={(e) => this.fetchMonthBudget(e.target.value, 'budget2')}
                    value={this.state.budget2}/>
                    
                </div>
                <button onClick={this.calculateBudget}>Calculate</button>
                {compareStatement}
            </div>
            
            
        )
    }
}

export default Compare;