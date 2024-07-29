import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import ListLeavesComponent from './components/ListLeavesComponent'
import LoginComponent from './components/LoginComponent'
import HomeComponent from './components/HomeComponent'
import LogOutComponent from './components/LogOutComponent'
import MustBeLoggedInComponent from './components/MustBeLoggedInComponent'
import GlolabLayoutComponent from './components/GlolabLayoutComponent'
import MustBeLoggedOutComponent from './components/MustBeLoggedOutComponent copy'
import LeaveComponent from './components/LeaveComponent'
import LeavesCalendarComponent from './components/LeavesCalendarComponent'


function App() {

  return (
    <>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <Routes>
          <Route element={<GlolabLayoutComponent />}>

            {/* Must be loggedOut routes */}
            <Route element={<MustBeLoggedOutComponent />}>
              <Route path='/login' element={<LoginComponent />}></Route>
            </Route>

            {/* Must be loggedIn routes */}
            <Route element={<MustBeLoggedInComponent />}>
              <Route path='/' element={<HomeComponent />}></Route>

              <Route path='/employees' element={<ListEmployeeComponent />}></Route>

              <Route path='/add-employee' element={<EmployeeComponent />}></Route>

              <Route path='/employees/:id' element={<EmployeeComponent />}></Route>

              <Route path='/leaves' element={<ListLeavesComponent />}></Route>

              <Route path='/add-leave' element={<LeaveComponent />}></Route>

              <Route path='/leaves-calendar' element={<LeavesCalendarComponent />}></Route>

              {/* Not existent route, redirect to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
