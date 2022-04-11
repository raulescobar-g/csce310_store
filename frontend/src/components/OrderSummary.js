import React from 'react'



export function OrderSummary(props) {
    
    const { order } = props

    return (
        <div>
            {JSON.stringify(order)}
        </div>
    )
}