import React from 'react'

const Alert = ( { type, text } ) => {
  return (
    <div className={ `alert alert-${ type }` }>
      <p>{ text }</p>
    </div>
  )
}

export default Alert;