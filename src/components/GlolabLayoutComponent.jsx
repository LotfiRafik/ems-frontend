import React from 'react'
import LogOutComponent from './LogOutComponent'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import { Outlet } from 'react-router-dom'

export default function GlolabLayoutComponent() {
    return (
        <>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}