import React from 'react';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md'

const ExpenseList = ( { expenses, handleEdit, handleDelete, clearItems } ) => {
  return (
    <>
      <ul className="list">
        {
          expenses.map( ( item ) => {
            return ( <ExpenseItem key={ item.id } expense={ item } handleEdit={ handleEdit } handleDelete={ handleDelete}/> )
          } )
        }
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={ clearItems }>
          <MdDelete className="btn-icon" />&nbsp;&nbsp;Clear Expenses
        </button>
      ) }
    </>
  )
}
export default ExpenseList;