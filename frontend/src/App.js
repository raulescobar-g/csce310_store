import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from './views/Landing'
import { Store } from './views/Store'
import { Login } from './views/Login'
import { Cart } from './views/Cart'
import { Payment } from './views/Payment'
import { History } from './views/History'
import { Account } from './views/Account'
import { Navbar } from './components/Navbar'

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<History />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
