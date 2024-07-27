import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/EmployeeService'

function LoginComponent() {
    const navigator = useNavigate();

    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    // Actions
    const handleSubmit = (e) => {
        e.preventDefault();


        const loginData = { "username": email, password }

        login(loginData).then((response) => {
            console.log(response);
            const data = response.data;
            // // TODO Reset state
            // setEmail("");
            // setPassword("");
            // Store jwt
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("id", data.id);
            navigator('/')
        }).catch(error => {
            setError(true);
            console.error(error);
        })


    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("Tokens have been removed");
    };


    // *********************** VIEW ***********************
    return (
        <div>
            <h1>Login</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div>Incorrect username or password</div>}
                <button className='btn btn-success' onClick={handleSubmit}>Login</button>
                <button className='btn btn-success' onClick={handleLogout}>Logout</button>
            </form>
        </div>
    );
};


export default LoginComponent