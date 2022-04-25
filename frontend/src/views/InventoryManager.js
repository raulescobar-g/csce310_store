import React, {useState} from 'react'

// Written by Zeeshan V
export function InventoryManager() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [productID, setID] = useState("");

    // Inserts a new element into database using provided information
    function handleAddProduct(event) {
        event.preventDefault();
        
        const data = {  name: document.getElementById("name").value,
                        price:  document.getElementById("price").value,
                        brand: document.getElementById("brand").value,
                        desc: document.getElementById("desc").value }

        fetch("http://localhost:5000/products/addproduct", {
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
    function handleUpdateProducts(event) {
        event.preventDefault();
        
        const data = {  name: document.getElementById("name").value,
                        price:  document.getElementById("price").value,
                        brand: document.getElementById("brand").value,
                        desc: document.getElementById("desc").value }

        fetch("http://localhost:5000/products/updateproduct", {
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
    function handleGetProducts(event) {
        event.preventDefault();

        fetch("http://localhost:5000/products/getproducts")
        .then((res) => res.json())

    }
    
    // Deletes product from database
    function handleDeleteProduct(event) {
        event.preventDefault();
        const data = {
            id: document.getElementById("productid").value
        }
        fetch("http://localhost:5000/products/deleteproduct", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
    }

    // Frontend for Inventory Management
    return (
        <div className="productManagement" style={{marginTop:'56px', marginBottom:'10px'}}>
            <button size="lg" type="button" style={{marginTop:'15px'}} onClick={handleGetProducts}>Get Products</button><br></br>
            <br></br>           
            <p style={{paddingTop:'5px'}}>Add a new product or Update an existing product</p>
            <form onSubmit={handleAddProduct}>
                <label for="name" class="login-label">Product Name</label>
                <input name="name" id="name" type="text" class="login-text" autoFocus value={name} onChange={(e) => setName(e.target.value)}></input><br></br>

                <label for="price" class="login-label">Product Price</label>
                <input name="price" id="price" type="text" class="login-text" autoFocus value={price} onChange={(e) => setPrice(e.target.value)}></input><br></br>

                <label for="brand" class="login-label">Product Brand</label>
                <input name="brand" id="brand" type="text" class="login-text" autoFocus value={brand} onChange={(e) => setBrand(e.target.value)}></input><br></br>

                <label for="desc" class="login-label">Product Description</label>
                <input name="desc" id="desc" type="text" class="login-text" autoFocus value={description} onChange={(e) => setDescription(e.target.value)}></input><br></br>

                <button block size="lg" type="submit">Add</button>
                <button block size="lg" style={ {marginLeft:'10px'} } onClick={handleUpdateProducts}>Update</button>
            </form><br></br>

            

            <form onSubmit={handleDeleteProduct}>
                <label for="productid" class="login-label">Product ID to Delete</label>
                <input name="productid" id="productid" type="text" class="login-text" autoFocus value={productID} onChange={(e) => setID(e.target.value)}></input>
                <button block size="lg" type="submit" style={ {marginLeft:'10px'} }>Delete</button>
            </form>
        </div>
    )
}

