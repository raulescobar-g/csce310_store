import React, {useState} from 'react'

// Written by Zeeshan V
export function InventoryManager() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [description, setDescription] = useState("");
    const [productID, setID] = useState("");
    const [image, setImage] = useState("");
    

    // Inserts a new element into database using provided information
    function handleAddProduct(event) {
        event.preventDefault();
        
        const data = {  name: document.getElementById("name").value,
                        price:  document.getElementById("price").value,
                        brand: document.getElementById("brand").value,
                        manufacturer: document.getElementById("manufacturer").value,
                        desc: document.getElementById("desc").value,
                        image: document.getElementById("image").value
                     }

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
                        manufacturer: document.getElementById("manufacturer").value,
                        desc: document.getElementById("desc").value,
                        image: document.getElementById("image").value
                     }

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
        .then((data) => {
            var list = document.getElementById("listOfInventory");
            list.innerHTML = ""
            for (var i in data) {
                var anchor = document.createElement("tr");
                anchor.innerHTML = "<td>"+data[i].product_id+"</td><td>"+data[i].product_name+"</td><td>$"+data[i].product_price+"</td><td>"+data[i].product_brand+"</td><td>"+data[i].manufacturer+"</td><td>"+data[i].product_description+"</td><td>"+data[i].imagelink+"</td>" 
                
                var btn = document.createElement("button");
                btn.className = "btn btn-primary";
                btn.id = data[i].product_id+"-edit"
                btn.innerHTML = "Edit";

                btn.addEventListener("click", function(e) { handleEdit( e.target ) });

                anchor.appendChild( btn )
                
                list.appendChild(anchor);
            }
        })

    }

    // Fills input textbox with information from the row where the button was clicked
    function handleEdit( elem ) {
        setName( elem.parentElement.childNodes[1].innerHTML )
        setPrice( elem.parentElement.childNodes[2].innerHTML )
        setBrand( elem.parentElement.childNodes[3].innerHTML )
        setManufacturer( elem.parentElement.childNodes[4].innerHTML )
        setDescription( elem.parentElement.childNodes[5].innerHTML )
        setImage( elem.parentElement.childNodes[6].innerHTML )
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
            <button className='btn btn-primary' size="lg" type="button" style={{marginTop:'15px'}} onClick={handleGetProducts}>Get Products</button><br></br>
            <br></br>           
            <p style={{paddingTop:'5px'}}>Add a new product or Update an existing product</p>
            <form onSubmit={handleAddProduct}>
                <label for="name" class="login-label">Product Name</label>
                <input name="name" id="name" type="text" class="login-text" autoFocus value={name} onChange={(e) => setName(e.target.value)}></input><br></br>

                <label for="price" class="login-label">Product Price</label>
                <input name="price" id="price" type="text" class="login-text" autoFocus value={price} onChange={(e) => setPrice(e.target.value)}></input><br></br>

                <label for="brand" class="login-label">Product Brand</label>
                <input name="brand" id="brand" type="text" class="login-text" autoFocus value={brand} onChange={(e) => setBrand(e.target.value)}></input><br></br>

                <label for="manufacturer" class="login-label">Product Manufacturer</label>
                <input name="manufacturer" id="manufacturer" type="text" class="login-text" autoFocus value={manufacturer} onChange={(e) => setManufacturer(e.target.value)}></input><br></br>

                <label for="desc" class="login-label">Product Description</label>
                <input name="desc" id="desc" type="text" class="login-text" autoFocus value={description} onChange={(e) => setDescription(e.target.value)}></input><br></br>

                <label for="image" class="login-label">Product Image</label>
                <input name="image" id="image" type="text" class="login-text" autoFocus value={image} onChange={(e) => setImage(e.target.value)}></input><br></br>
                
                <button  className='btn btn-primary' block size="lg" type="submit">Add</button>
                <button  className='btn btn-primary' block size="lg" style={ {marginLeft:'10px'} } onClick={handleUpdateProducts}>Update</button>
            </form><br></br>

            

            <form onSubmit={handleDeleteProduct}>
                <label for="productid" class="login-label">Product ID to Delete</label>
                <input name="productid" id="productid" type="text" class="login-text" autoFocus value={productID} onChange={(e) => setID(e.target.value)}></input>
                <button className='btn btn-danger' block size="lg" type="submit" style={ {marginLeft:'10px'} }>Delete</button>
            </form>

            <p>List of all inventory</p>
            {/* <ul id="listOfInventory" style={{listStyle:'none'}}>
            </ul> */}
            <table class="table">
                <tr>
                    <th>Item ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Manufacturer</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th> </th>
                </tr>
                <tbody id="listOfInventory">

                </tbody>
            </table>
        </div>
    )
}

