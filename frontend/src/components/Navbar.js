import React from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
    return (
    <nav>
        <Link to="/">Landing</Link>
        <Link to="/store">Store</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/history">Order History</Link>
        <Link to="/account">Account</Link>
      </nav>
    )
}