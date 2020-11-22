import React, { Component } from 'react';
import Subtotal from '../Subtotal/Subtotal';
import BudgetItems from '../BudgetItems/BudgetItems';
import classes from './BudgetCategory.module.css';

class BudgetCategory extends Component {
    handleClick = (id, category) => {
        this.props.onButtonClick(id, category)
    }
    render () {
        let budgetArray = [];
        for (let key in this.props.budget) {
            budgetArray.push({
                id: key,
                config: this.props.budget[key]
            });
        }

        let budget = budgetArray.map(element => {
            return element.config.map(subelement => {
                return (
                    <div>
                        <BudgetItems 
                            heading={this.props.category}
                            id={subelement.id}
                            income={subelement.income}
                            expense={subelement.expense}
                            name={subelement.name}
                            amount={subelement.amount}
                            category={subelement.category}
                            clicked={() => this.handleClick(subelement.id, subelement.category)}>
                        </BudgetItems>
                    </div>
                    
                )
            })
        })

        return (
            <div className={this.props.category === 'income' ? classes.income : classes.BudgetItems}>
                <div className={classes.BudgetItemsHeading}>
                    <h3>{this.props.category}</h3>
                    <Subtotal 
                        category={this.props.category}
                        subtotal={this.props.subtotal}
                        total={this.props.total}/>
                </div>
                {budget}
            </div>
        )
    }
    
}

export default BudgetCategory;