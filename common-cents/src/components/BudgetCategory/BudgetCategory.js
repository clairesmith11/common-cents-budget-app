import React from 'react';
import Subtotal from '../Subtotal/Subtotal';
import BudgetItems from '../BudgetItems/BudgetItems';
import classes from './BudgetCategory.module.css';

const BudgetCategory = props => {
    const handleClick = (id, category) => {
        props.onButtonClick(id, category)
    }
    let budgetArray = [];
    for (let key in props.budget) {
        budgetArray.push({
        id: key,
        config: props.budget[key]
        });
    }

    let budget = budgetArray.map(element => {
        return element.config.map(subelement => {
            return (
                <div>
                    <BudgetItems 
                        key={Math.random()}
                        heading={props.category}
                        id={subelement.id}
                        income={subelement.income}
                        expense={subelement.expense}
                        name={subelement.name}
                        amount={subelement.amount}
                        category={subelement.category}
                        clicked={() => handleClick(subelement.id, subelement.category)}>
                    </BudgetItems>
                </div>
                    
            )
        })
    })

        return (
            <div className={props.category === 'income' ? classes.income : classes.BudgetItems}>
                <div className={classes.BudgetItemsHeading}>
                    <h3>{props.category}</h3>
                    <Subtotal 
                        category={props.category}
                        subtotal={props.subtotal}
                        total={props.total}/>
                </div>
                {budget}
            </div>
        )
    
    
}

export default BudgetCategory;