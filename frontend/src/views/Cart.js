import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getFromStorage } from '../utils/localStorage'

const CartBox = styled.div`
    padding: 10rem;
`
const Col = styled.div`
    width : 20%;
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
        await updateCart(e, 1)
    }

    const onMinus = async (e) => {
        await updateCart(e, -1)
    }

    const updateCart = async (e, amount) => {
        try{
            const user_id = getFromStorage('user_id')
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": user_id,
                    "product_id":e.target.id,
                    "qty":amount

                })
            }
            const _ = await fetch("http://localhost:5000/carts/", options)

            const new_cart = await fetch(`http://localhost:5000/carts/${user_id}`)
            const jsoned = await new_cart.json()
            setCart(jsoned.cart)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <CartBox>
            <Row>
                <Col><strong>Name</strong></Col>
                <Col><strong>Brand</strong></Col>
                <Col><strong>Price</strong></Col>
                <Col><strong>Quantity</strong></Col>
                <Col><strong>Edit</strong></Col>
            </Row>
            {cart.map(item => {
                return (
                    <Row>
                        <Col>{item.product_name}</Col>
                        <Col>{item.product_brand}</Col>
                        <Col>{item.product_price}</Col>
                        <Col>{item.quantity}</Col>
                        <Col><Button id={item.product_id} onClick={onMinus}>-</Button><Button id={item.product_id} onClick={onPlus}>+</Button></Col>
                    </Row>
                )
            })
        }
        <Button onClick={navToPay}>Go to Payment</Button>
        </CartBox>
    )
}