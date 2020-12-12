import React from 'react';
import { MdSend } from 'react-icons/md';

const ExpensesForm = ( { charge, amount, handleCharge, handleAmount, handleSubmit, edit } ) => {
  return (
    <>
      <form onSubmit={ handleSubmit }>
        <div className="form-center">
          <div className="form-group">
            <label htmlFor="charge">Charge</label>
            <input
              type="text"
              id="charge"
              className="form-control"
              name="charge"
              placeholder="E.g.: Rent"
              value={ charge }
              onChange={ handleCharge }
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              name="amount"
              placeholder="Rs. 1000"
              value={ amount }
              onChange={ handleAmount }
            />
          </div>
        </div>
        <button type="submit" className="btn">
          <MdSend className="btn-icon" />
          &nbsp;&nbsp;{ edit ? 'Edit' : 'Submit'}
        </button>
      </form>
    </>
  )
}

export default ExpensesForm;