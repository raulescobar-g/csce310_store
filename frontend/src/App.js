import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Store } from './views/Store'
import { Login } from './views/Login'
import { Register } from './views/Register'
import { Cart } from './views/Cart'
import { Payment } from './views/Payment'
import { History } from './views/History'
import { Account } from './views/Account'
import Template from "./components/template/Template";
import Landing from "./components/landing/Landing";
import ProductDetail from "./components/products/detail/ProductDetail";
import ProductList from "./components/products/ProductList";

import "./App.css";
import { InventoryManager } from "./views/InventoryManager";

function App() {

  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({user_id : -1})

  useEffect(() => {
    const options = {

    }
    const cart_arr = fetch("http://localhost:5000/cart/", options).then(data => {
      return data
    }).catch(err => {
      console.log(err)
    })
    
  }, [])

  return (
    <div className="App">
      <Template cart={cart} setCart={setCart}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<Account />} />
          <Route path="/manageinventory" element={<InventoryManager />} />
        </Routes>
      </Template>
    </div>
  );
}

export default App;
