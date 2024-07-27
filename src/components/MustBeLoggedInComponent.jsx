import React, { useState, useEffect } from 'react'
import { listEmployees, updateEmployee, deleteEmployee } from '../services/EmployeeService'
import { Link, Outlet, useNavigate } from 'react-router-dom'


export default function MustBeLoggedInComponent() {
    const navigator = useNavigate();


    useEffect(() => {
        if (localStorage.getItem("jwt")){
            return;
        }
        navigator("/login");
    })


    return (
        <>
            {!localStorage.getItem("jwt") ?
                <div>
                    <span>Must be loggedIn to access to this page !</span>
                    <Link to={"/login"}>Login</Link>
                </div>

                :
                <Outlet />
            }

        </>
    )
}