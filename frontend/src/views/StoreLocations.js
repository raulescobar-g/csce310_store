import React, {useState} from 'react'

// Written by Zeeshan V
export function StoreLocations() {
    const [storeID, setID] = useState("");
    const [storeAddress, setAddress] = useState("");
    const [storeCity, setCity] = useState("");
    const [storeState, setState] = useState("");
    const [storeZip, setZip] = useState("");

    // Inserts a new element into database using provided information
    function handleAddStore(event) {
        event.preventDefault();
        
        const data = {  address: document.getElementById("address").value,
                        city:  document.getElementById("city").value,
                        state: document.getElementById("state").value,
                        zip: document.getElementById("zip").value }

        fetch("http://localhost:5000/stores/add", {
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
    function handleUpdateStore(event) {
        event.preventDefault();
        
        const data = {  address: document.getElementById("address").value,
                        city:  document.getElementById("city").value,
                        state: document.getElementById("state").value,
                        zip: document.getElementById("zip").value }

        fetch("http://localhost:5000/stores/update", {
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

    // Queries the database for the full list of stores
    function handleGetStores(event) {
        event.preventDefault();

        // fetch("http://localhost:5000/stores/get")
        // .then(response => response.json())
        // .then(data => {
        //     console.log( data[0] )
        // });

        fetch('http://localhost:5000/stores/get')
        .then(response => response.json())
        .then(data => {
            //alert( data[0].address )

            var list = document.getElementById("listOfStores");
            list.innerHTML = ''
            for (var i in data) {
                var anchor = document.createElement("tr");
                anchor.innerHTML = "<td>"+data[i].store_id+"</td><td>"+data[i].address+"</td><td>"+data[i].city+"</td><td>"+data[i].state+"</td><td>"+data[i].zip+"</td>"

                var btn = document.createElement("button");
                btn.className = "btn btn-primary";
                btn.innerHTML = "Edit";

                btn.addEventListener("click", function(e) { handleEdit( e.target ) });

                anchor.appendChild( btn )

                list.appendChild(anchor);
            }
        });

    }

    // Fills text input with information from the row where the button was clicked
    function handleEdit( elem ) {
        setAddress( elem.parentElement.childNodes[1].innerHTML )
        setCity( elem.parentElement.childNodes[2].innerHTML )
        setState( elem.parentElement.childNodes[3].innerHTML )
        setZip( elem.parentElement.childNodes[4].innerHTML )
    }
    
    // Deletes store from database
    function handleDeleteStores(event) {
        event.preventDefault();
        const data = {
            id: document.getElementById("id").value
        }
        fetch("http://localhost:5000/stores/delete", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
    }

    // Frontend for Store Management
    return (
        <div className="storeManagement" style={{marginTop:'56px', marginBottom:'10px'}}>
            <button className='btn btn-primary' size="lg" type="button" style={{marginTop:'15px'}} onClick={handleGetStores}>Get all Stores</button><br></br>
            <br></br>           
            <p style={{paddingTop:'5px'}}>Add a new store or Update an existing store</p>
            <form onSubmit={handleAddStore}>
                <label for="address" class="login-label">Address</label>
                <input name="address" id="address" type="text" class="login-text" autoFocus value={storeAddress} onChange={(e) => setAddress(e.target.value)}></input><br></br>

                <label for="city" class="login-label">City</label>
                <input name="city" id="city" type="text" class="login-text" autoFocus value={storeCity} onChange={(e) => setCity(e.target.value)}></input><br></br>

                <label for="state" class="login-label">State</label>
                <input name="state" id="state" type="text" class="login-text" autoFocus value={storeState} onChange={(e) => setState(e.target.value)}></input><br></br>

                <label for="zip" class="login-label">Zip</label>
                <input name="zip" id="zip" type="text" class="login-text" autoFocus value={storeZip} onChange={(e) => setZip(e.target.value)}></input><br></br>

                <button className='btn btn-primary' block size="lg" type="submit">Add</button>
                <button className='btn btn-primary' block size="lg" style={ {marginLeft:'10px'} } onClick={handleUpdateStore}>Update</button>
            </form><br></br>

            

            <form onSubmit={handleDeleteStores}>
                <label for="id" class="login-label">Store ID to Delete</label>
                <input name="id" id="id" type="text" class="login-text" autoFocus value={storeID} onChange={(e) => setID(e.target.value)}></input>
                <button className='btn btn-danger' block size="lg" type="submit" style={ {marginLeft:'10px'} }>Delete</button>
            </form>

            <p>List of all stores</p>
            <table class="table">
                <tr>
                    <th>Store ID</th>
                    <th>Store Address</th>
                    <th>Store City</th>
                    <th>Store State</th>
                    <th>Store Zip</th>
                    <th> </th>
                </tr>
                <tbody id="listOfStores">

                </tbody>
            </table>
        </div>
    )
}

