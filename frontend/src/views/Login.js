import React, {useState} from 'react'
import { getFromStorage, saveToStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom'
// Written by Zeeshan V
export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate()
    // Checks if email or password fields are empty
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    // Calls backend to attempt a login with the filled email and password
    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = { username: document.getElementById("username").value,
                        password:  document.getElementById("password").value }
        
        const res = await fetch("http://localhost:5000/users/trylogin", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        const info = await res.json()
        
        if (info.user_id !== -1) {
            saveToStorage(info?.user_id, 'user_id')
            saveToStorage(info?.firstname, 'firstname')
            nav('/')
        } else {
            alert("Failed to login")
        }
    }

    // Frontend for Login page
    return (
        <div className="login" style={{marginTop:'56px', marginBottom:'10px'}}>
            <p style={{paddingTop:'10px'}}>Login to your account.</p>
            <form onSubmit={handleSubmit}>
                <label for="email" class="login-label">Email:</label>
                <input name="username" id="username" type="email" class="login-text" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}></input><br></br>

                <label for="password" class="login-label">Password:</label>
                <input name="password" id="password" type="password" class="login-text" autoFocus value={password} onChange={(e) => setPassword(e.target.value)}></input><br></br>

                <button className='btn btn-secondary btn-block' type="submit" disabled={!validateForm()}>
                Login
                </button>
            </form>
        </div>
    )
}

