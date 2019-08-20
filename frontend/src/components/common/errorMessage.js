import React from 'react'

const ErrorMessage = props => (
  <h4 className="page-error">
    {props.code && (
      <span style={{ borderRight: '1px solid #EAEAEA', padding: '10px' }}>{props.code}</span>
    )}
    <span style={{ paddingLeft: '10px' }}>{props.message}</span>
  </h4>
)

export default ErrorMessage
