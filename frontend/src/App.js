import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from './views/Login'
import { Register } from './views/Register'
import { Cart } from './views/Cart'
import { Payment } from './views/Payment'
import Template from "./components/template/Template";
import Landing from "./components/landing/Landing";
import ProductDetail from "./components/products/detail/ProductDetail";
import ProductList from "./components/products/ProductList";
import Settings from "./components/Settings";
import OrderList from "./components/orders/OrderList";
import OrderDetail from "./components/orders/detail/OrderDetail";
import {HistoryManager} from "./views/HistoryManager";

import "./App.css";
import { InventoryManager } from "./views/InventoryManager";
import { StoreLocations } from "./views/StoreLocations";

import { getFromStorage, saveToStorage } from './utils/localStorage'

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({ items: [] })

  useEffect(() => {
    const user_id = getFromStorage('user_id')
    fetch(`http://localhost:5000/carts/${user_id}`)
    .then(response => response.json())
    .then(data => {
      setCart(data?.cart)}
    )

    fetch('http://localhost:5000/products/getproducts/')
      .then(response => response.json())
      .then(data => {
        setProducts({ 
          items: data})
        })
  },[])

  return (
    <div className="App">
      <Template cart={cart} setCart={setCart}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<ProductList state={products} setState={setProducts} setCart={setCart} cart={cart}/>} />
          <Route path="/products/:slug" element={<ProductDetail cart={cart} setCart={setCart}/>} />
          <Route path="/orders/:slug" element={<OrderDetail />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment cart={cart} setCart={setCart}/>} />
          <Route path="/manageinventory" element={<InventoryManager />} />
          <Route path="/stores" element={<StoreLocations />} />
          <Route path="/managehistory" element={<HistoryManager />} />
        </Routes>
      </Template>
    </div>
  );
}

export default App;
