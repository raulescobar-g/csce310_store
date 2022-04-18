import React, {useState} from 'react'

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        alert("Trying");
        fetch("http://localhost:5000/users/trylogin", {
            method: 'POST',
            mode: "no-cors",
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {"Content-Type": "application/json"}
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
                <input name="username" type="email" class="login-text" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>

                <label for="password" class="login-label">Password</label>
                <input name="password" type="password" class="login-text" autoFocus value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>

                <button block size="lg" type="submit" disabled={!validateForm()}>
                Login
                </button>
            </form>
        </div>
    )
}

