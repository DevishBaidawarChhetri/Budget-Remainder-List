import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

const ExpenseItem = ( { expense, handleEdit, handleDelete } ) => {
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        <div className="expense">{ charge }</div>
        <div className="amount">$ { amount }</div>
      </div>
      <div>
        <button className="edit-btn" onClick={ () => handleEdit( id ) }>
          <MdEdit />
        </button>
        <button className="delete-btn" onClick={ () => handleDelete( id ) }>
          <MdDelete />
        </button>
      </div>
    </li>
  )
}
export default ExpenseItem;