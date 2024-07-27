import React from 'react'
import LogOutComponent from './LogOutComponent'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">Employee Management App</Link>

                    {
                        localStorage.getItem("jwt")
                        &&
                        <LogOutComponent />
                    }

                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent