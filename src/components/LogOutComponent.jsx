import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'

const LogOutComponent = () => {
    const navigator = useNavigate();

    function logout() {
        localStorage.removeItem("jwt");
        navigator('/');
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}

export default LogOutComponent