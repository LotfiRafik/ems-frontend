import React, { useState, useEffect } from 'react'
import { listEmployees, updateEmployee, deleteEmployee } from '../services/EmployeeService'
import { Link, useNavigate } from 'react-router-dom'

function HomeComponent() {
    const navigator = useNavigate();


    return (
        <>
            {!localStorage.getItem("jwt") ?


                <div>
                    <span>Must be loggedIn to access to this page !</span>
                    <Link to={"/login"}>Login</Link>
                </div>

                :
                <div className='container'>
                    {/* TODO personlize based on user */}
                    <ul>
                        <li><Link to={"me"}>My Profile</Link></li>
                        <li><Link to={"/employees"}>Employees</Link></li>
                        <li><Link to={"/leaves"}>Leaves</Link></li>
                    </ul>
                </div>
            }

        </>
    )
}

export default HomeComponent