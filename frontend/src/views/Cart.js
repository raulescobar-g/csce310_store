import React from 'react'


export function Cart({cart, setCart}) {
    return (
        <div className="container-fluid vh-100 mt-5">
            {cart.map(item => {
                return (
                    <div className="row">hi</div>
                )
            })
        }
        </div>
    )
}