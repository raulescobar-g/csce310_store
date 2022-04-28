import React, { useEffect, useState } from 'react'


export function Cart({cart, setCart}) {

    console.log(cart)

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