import React, {useState} from 'react'

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const data = {  fname: document.getElementById("fname").value,
                        lname: document.getElementById("lname").value,
                        email: document.getElementById("email").value,
                        password:  document.getElementById("password").value }
        alert("Trying" + data.username + data.password);
        fetch("http://localhost:5000/users/tryregister", {
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
        <div className="login" style={{marginTop:'56px', marginBottom:'10px'}}>
            <p style={{paddingTop:'10px'}}>Create your account</p>
            <form onSubmit={handleSubmit}>
                <label for="fname" class="login-label">First Name</label>
                <input name="fname" id="fname" type="text" class="login-text" autoFocus value={fname} onChange={(e) => setFName(e.target.value)}></input><br></br>

                <label for="lname" class="login-label">Last Name</label>
                <input name="lname" id="lname" type="text" class="login-text" autoFocus value={lname} onChange={(e) => setLName(e.target.value)}></input><br></br>

                <label for="email" class="login-label">Email</label>
                <input name="email" id="email" type="email" class="login-text" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>

                <label for="password" class="login-label">Password</label>
                <input name="password" id="password" type="password" class="login-text" autoFocus value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>

                <button block size="lg" type="submit" disabled={!validateForm()}>
                Login
                </button>
            </form>
        </div>
    )
}

