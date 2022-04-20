import React, {useState} from 'react'

export function InventoryManager() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");

    function handleAddProduct(event) {
        event.preventDefault();
        
        const data = {  name: document.getElementById("name").value,
                        price:  document.getElementById("price").value,
                        brand: document.getElementById("brand").value,
                        description: document.getElementById("desc").value }

        fetch("http://localhost:5000/addproduct", {
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

    return (
        <div className="productManagement" style={{marginTop:'56px', marginBottom:'10px'}}>
            <p style={{paddingTop:'10px'}}>Add a new product</p>
            <form onSubmit={handleAddProduct}>
                <label for="name" class="login-label">Product Name</label>
                <input name="name" id="name" type="text" class="login-text" autoFocus value={name} onChange={(e) => setName(e.target.value)}></input><br></br>

                <label for="price" class="login-label">Password</label>
                <input name="price" id="price" type="text" class="login-text" autoFocus value={price} onChange={(e) => setPrice(e.target.value)}></input><br></br>

                <label for="brand" class="login-label">Password</label>
                <input name="brand" id="brand" type="text" class="login-text" autoFocus value={brand} onChange={(e) => setBrand(e.target.value)}></input><br></br>

                <label for="desc" class="login-label">Password</label>
                <input name="desc" id="desc" type="text" class="login-text" autoFocus value={description} onChange={(e) => setDescription(e.target.value)}></input><br></br>

                <button block size="lg" type="submit">
                Add
                </button>
            </form>
        </div>
    )
}

