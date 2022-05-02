//Kara Capps
import React, {useState} from 'react'

export function HistoryManager() {
    //Dont know if it's order_num or order_number
    const [order_num, setOrderNum] = useState("");
    const [user_id, setUserID] = useState("");
    const [product_id, setProductID] = useState("");
    const [payment_id, setPaymentID] = useState("");
    const [orderID, setID] = useState("")

    // Inserts a new element into database using provided information
    function handleAddOrder(event) {
        event.preventDefault();
        
        const data = {  order_num: document.getElementById("order_num").value,
                        user_id:  document.getElementById("price").value,
                        product_id: document.getElementById("product_id").value,
                        payment_id: document.getElementById("payment_id").value }

        fetch("http://localhost:5000/orders/addorder", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then((data) => {
            
        })
        .catch(res=>{
            console.log("Exception : ",res);
        })
    }

    // Updates element in database based on information
    function handleUpdateOrder(event) {
        event.preventDefault();
        
        const data = {  order_num: document.getElementById("order_num").value,
                        user_id:  document.getElementById("user_id").value,
                        product_id: document.getElementById("product_id").value,
                        payment_id: document.getElementById("payment_id").value }

        fetch("http://localhost:5000/orders/updateorder", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then((data) => {
            
        })
        .catch(res=>{
            console.log("Exception : ",res);
        })
    }

    // Queries the database for the full list of products
    function handleGetOrders(event) {
        event.preventDefault();

        fetch("http://localhost:5000/orders/getorders")
        .then((res) => res.json())
        .then((data) => {
            var list = document.getElementById("listOfOrders");
            list.innerHTML = ''
            for (var i in data) {
                var anchor = document.createElement("li");
                anchor.innerHTML = data[i].product_id + ": " + data[i].product_name + "; $" + data[i].product_price + "; " + data[i].product_brand + "; " + data[i].product_description
                list.appendChild(anchor);
            }
        })

    }
    
    // Deletes product from database
    function handleDeleteOrder(event) {
        event.preventDefault();
        const data = {
            id: document.getElementById("productid").value
        }
        fetch("http://localhost:5000/orders/deleteorder", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
    }

    // Frontend for Inventory Management
    return (
        <div className="productManagement" style={{marginTop:'56px', marginBottom:'10px'}}>
            <button size="lg" type="button" style={{marginTop:'15px'}} onClick={handleGetOrders}>Get Products</button><br></br>
            <br></br>           
            <p style={{paddingTop:'5px'}}>Add a new order or Update an existing order</p>
            <form onSubmit={handleAddOrder}>
                <label for="order_num" class="login-label">Order Number</label>
                <input name="order_num" id="order_num" type="text" class="login-text" autoFocus value={order_num} onChange={(e) => setOrderNum(e.target.value)}></input><br></br>

                <label for="user_id" class="login-label">User ID</label>
                <input name="user_id" id="user_id" type="text" class="login-text" autoFocus value={user_id} onChange={(e) => setUserID(e.target.value)}></input><br></br>

                <label for="product_id" class="login-label">Product ID</label>
                <input name="product_id" id="product_id" type="text" class="login-text" autoFocus value={product_id} onChange={(e) => setProductID(e.target.value)}></input><br></br>

                <label for="payment_id" class="login-label">Payment ID</label>
                <input name="payment_id" id="payment_id" type="text" class="login-text" autoFocus value={payment_id} onChange={(e) => setPaymentID(e.target.value)}></input><br></br>

                <button block size="lg" type="submit">Add</button>
                <button block size="lg" style={ {marginLeft:'10px'} } onClick={handleUpdateOrder}>Update</button>
            </form><br></br>

            

            <form onSubmit={handleDeleteOrder}>
                <label for="orderid" class="login-label">Order Number to Delete</label>
                <input name="orderid" id="orderid" type="text" class="login-text" autoFocus value={orderID} onChange={(e) => setID(e.target.value)}></input>
                <button block size="lg" type="submit" style={ {marginLeft:'10px'} }>Delete</button>
            </form>

            <p>List of all orders</p>
            <ul id="listOfOrders" style={{listStyle:'none'}}>
            </ul>
        </div>
    )
}

