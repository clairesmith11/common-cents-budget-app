import React, { Component } from 'react';
import classes from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


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

        const submitError = this.props.error ? 
            <p className={classes.error}>Please sign up or log in to submit.</p> 
            : null;

        const submitSuccess = this.props.success ?
            <p className={classes.success}>Submitted successfully!</p>
            : null;

        const icon = this.props.loading 
            ? <FontAwesomeIcon icon={faSpinner} className="fa-pulse" size="4x" />
            : null;

        return (
            <div className={this.props.show ? classes.BackdropShown : classes.BackdropHidden}>
                <div className={this.props.show ? classes.ModalShown : classes.ModalHidden}>
                    {message}
                    <h3>You saved <span>${this.props.total}</span> this month</h3>
                    <p>You spent the most on <span>{highest.category}</span> at <span>${highest.amount.toFixed(2)}</span></p>
                    <p>You spent the next most on <span>{secondHighest.category}</span> at <span>${secondHighest.amount.toFixed(2)}</span></p>
                    <button onClick={this.props.submit}>Submit Month</button>
                    {icon}
                    <button onClick={this.props.close}>Close</button>
                    
                    {submitError}
                    {submitSuccess}
                </div>
                
            </div>
        )
    }
    
}

export default Modal;