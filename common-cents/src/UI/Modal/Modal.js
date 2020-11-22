import React, { Component } from 'react';
import classes from './Modal.module.css';


class Modal extends Component {

    render () {
        const message = this.props.total > 0 ? <h2>Congratulations!</h2> : <h2>Sorry!</h2>
        const sortedSubtotals = this.props.subtotals.sort((a, b) => {
            let keyA = a.amount;
            let keyB = b.amount;
            return keyA - keyB
        })
        const highest = sortedSubtotals[0];
        const secondHighest = sortedSubtotals[1];

        return (
            <div className={this.props.show ? classes.BackdropShown : classes.BackdropHidden}>
                <div className={this.props.show ? classes.ModalShown : classes.ModalHidden}>
                    {message}
                    <h3>You saved <span>${this.props.total}</span> this month</h3>
                    <p>You spent the most on <span>{highest.category}</span> at <span>${highest.amount.toFixed(2)}</span></p>
                    <p>You spent the next most on <span>{secondHighest.category}</span> at <span>${secondHighest.amount.toFixed(2)}</span></p>
                    <button onClick={this.props.submit}>Submit Month</button>
                    <button onClick={this.props.close}>Close</button>
                </div>
            </div>
        )
    }
    
}

export default Modal;