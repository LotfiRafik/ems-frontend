import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


export default function MustBeLoggedOutComponent() {
    const navigator = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            return;
        }
        navigator("/");
    })


    return (
        <>
            {localStorage.getItem("jwt") ?
                <div>
                </div>
                :
                <Outlet />
            }

        </>
    )
}