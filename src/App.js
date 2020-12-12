import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpensesForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuid } from 'uuid';

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1111 },
//   { id: uuid(), charge: "vehicles", amount: 2222 },
//   { id: uuid(), charge: "personal", amount: 3333 }
// ];
// console.log( initialExpenses );

const initialExpenses = localStorage.getItem( 'budget-expenses-list' )
  ? JSON.parse( localStorage.getItem( 'budget-expenses-list' ) )
  : [];

function App () {
  // ********* State Values ********* 
  // All expenses and totals
  const [ expenses, setExpenses ] = useState( initialExpenses );

  // Single Expense
  const [ charge, setCharge ] = useState( "" ); // "" is default value

  // Single Amount
  const [ amount, setAmount ] = useState( "" ); // "" is default value

  // Alert
  const [ alert, setAlert ] = useState( { show: false } );

  // Edit 
  const [ edit, setEdit ] = useState( false );

  // Edit Item
  const [ id, setId ] = useState( 0 );

  // ********* useEffect *********
  useEffect( () => {
    localStorage.setItem( 'budget-expenses-list', JSON.stringify( expenses ) );
  }, [ expenses ] );

  // ********* Functionality *********
  const handleCharge = e => {
    // console.log( `Charge: ${ e.target.value }` );
    setCharge( e.target.value );
  };

  const handleAmount = e => {
    // console.log( `Amount: ${ e.target.value }` );
    setAmount( e.target.value )
  };

  const handleAlert = ( { type, text } ) => {
    setAlert( { show: true, type, text } );
    setTimeout( () => {
      setAlert( { show: false } );
    }, 1500 );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ( charge !== "" && amount > 0 ) {
      if ( edit ) {
        let tempExpenses = expenses.map( ( item ) => {
          return (
            item.id === id ? { ...item, charge, amount } : item// 'id' is from state
          );
        } )
        setExpenses( tempExpenses );
        setEdit( false );
        handleAlert( { type: 'success', text: 'Item Edited.' } );
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses( [ ...expenses, singleExpense ] );
        handleAlert( { type: 'success', text: 'Item Added.' } );
      }
      setCharge( '' );
      setAmount( '' );
    } else {
      handleAlert( { type: 'danger', text: `Charge cannot be empty and amount has to be greater than 0` } );
    }
  }

  // Clear all items
  const clearItems = () => {
    setExpenses( [] );
    handleAlert( { type: 'danger', text: `All Items Deleted.` } );
  };


  // Edit item
  const handleEdit = id => {
    // console.log( `item edited: ${ id }` );
    let expense = expenses.find( ( item ) => item.id === id );
    let { charge, amount } = expense;
    setCharge( charge );
    setAmount( amount );
    setEdit( true );
    setId( id );
    // handleAlert( { type: 'success', text: `Item Edited.` } );
  }

  // Delete item
  const handleDelete = id => {
    console.log( `item deleted: ${ id }` );
    let tempExpenses = expenses.filter( ( item ) => item.id !== id );
    setExpenses( tempExpenses );
    handleAlert( { type: 'danger', text: `Item with id: "${ id }" Deleted` } )
  }

  return (
    <>
      {alert.show && <Alert type={ alert.type } text={ alert.text } /> }
      <h1>Budget Remainder List</h1>
      <main className="App">
        <ExpenseForm
          charge={ charge }
          amount={ amount }
          handleCharge={ handleCharge }
          handleAmount={ handleAmount }
          handleSubmit={ handleSubmit }
          edit={ edit }
        />
        <ExpenseList expenses={ expenses } handleEdit={ handleEdit } handleDelete={ handleDelete } clearItems={ clearItems } />
      </main>
      <h1>
        total spending:&nbsp;
        <span className="total">
          ${
            expenses.reduce( ( accumulator, value ) => {
              return ( accumulator + parseInt( value.amount ) );
            }, 0 )
          }
        </span>
      </h1>
    </>
  );
}

export default App;