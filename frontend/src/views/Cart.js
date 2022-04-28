import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getFromStorage } from '../utils/localStorage'
const CartBox = styled.div`
    padding: 10rem;
`
const Col = styled.div`
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 10px;
    border: 1px solid grey;
    margin-bottom: 1rem;
    padding: 1rem;
`
const Button = styled.button`
    padding:0.3rem;
    background: grey;
`

export function Cart({cart, setCart}) {
    const nav = useNavigate()
    console.log(cart)

    const navToPay = () => {
        nav("/payment")
    }
    const onPlus = async (e) => {
        const user_id = getFromStorage('user_id')
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user_id,
                "product_id":e.target.id,
                "qty":1

            })
        }
        const res = await fetch("http://localhost:5000/carts/", options)
        console.log(res)
    }
    const onMinus = (e) => {

    }

    return (
        <CartBox>
            <Row>
                <Col><strong>Name</strong></Col>
                <Col><strong>Brand</strong></Col>
                <Col><strong>Description</strong></Col>
                <Col><strong>Price</strong></Col>
                <Col><strong>Quantity</strong></Col>
                <Col><strong>Edit</strong></Col>
            </Row>
            {cart.map(item => {
                return (
                    <Row>
                        <Col>{item.product_name}</Col>
                        <Col>{item.product_brand}</Col>
                        <Col>{item.product_description}</Col>
                        <Col>{item.product_price}</Col>
                        <Col>{item.quantity}</Col>
                        <Col><Button id={item.product_id} onClick={onMinus}>-</Button><Button id={item.product_id} onClick={onPlus}>+</Button></Col>
                    </Row>
                )
            })
        }
        <Button onClick={navToPay}>Buy</Button>
        </CartBox>
    )
}