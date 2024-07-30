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


    // *********************** VIEW ***********************
    return (


        <div className="container mt-5">
            <div className="row mb-3">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1>Login</h1>
                </div>
                <div className="col-3"></div>

            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="mb-1">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="mb-1">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div>Incorrect username or password</div>}
                        <button className='btn btn-success' onClick={handleSubmit}>Login</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );
};


export default LoginComponent