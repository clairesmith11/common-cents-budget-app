import React, {Component} from 'react';
import classes from './Subtotal.module.css';
import ProgressBar from '../Progress/ProgressBar';

class Subtotal extends Component {
    state = {
        goal: null
    }

    setGoalHandler = (e) => {
        this.setState({goal: e.target.value})
    }

    render() {
        const subtotals = this.props.category === 'income' ? null : (
            <div>
                <div className={classes.SubtotalContainer}>
                    <label>Set Goal:</label>
                    <input type="number" onChange={this.setGoalHandler}></input>
                    <p className={classes.Subtotal}>Subtotal: {'$' + this.props.subtotal.toFixed(2)} </p>  
                </div>
                <div className={classes.Percentage}>
                    <ProgressBar goal={this.state.goal} total={this.props.subtotal > 0 ? this.props.subtotal : this.props.subtotal * -1} />
                </div>
                    
            </div>)
        return (
            <div>
                {subtotals}
            </div>
            
            
            
        )
    }
}

export default Subtotal;