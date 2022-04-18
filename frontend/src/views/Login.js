import React, {useState} from 'react'

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        const data = { username: document.getElementById("username").value,
                        password:  document.getElementById("password").value }
        alert("Trying" + data.username + data.password);
        fetch("http://localhost:5000/users/trylogin", {
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
            <p style={{paddingTop:'10px'}}>Login to your account.</p>
            <form onSubmit={handleSubmit}>
                <label for="email" class="login-label">Email</label>
                <input name="username" id="username" type="email" class="login-text" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>

                <label for="password" class="login-label">Password</label>
                <input name="password" id="password" type="password" class="login-text" autoFocus value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>

                <button block size="lg" type="submit" disabled={!validateForm()}>
                Login
                </button>
            </form>
        </div>
    )
}

