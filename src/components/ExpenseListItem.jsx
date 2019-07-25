import React from 'react'

export default (props) => (
    <div>
        <h3>Description: {props.description}</h3>
        <p>
        Amount: {props.amount}  <br/>
        Created At: {props.createdAt}
        </p>
    </div>
)