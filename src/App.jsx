import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeComponent from './components/EmployeeComponent'
import ListLeavesComponent from './components/ListLeavesComponent'

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
        <HeaderComponent/>
        <Routes>
          <Route path='/' element= {<ListEmployeeComponent/>}></Route>
          
          <Route path='/employees' element= {<ListEmployeeComponent/>}></Route>

          <Route path='/add-employee' element= {<EmployeeComponent/>}></Route>

          <Route path='/edit-employee/:id' element = { <EmployeeComponent /> }></Route>


          <Route path='/leaves' element= {<ListLeavesComponent/>}></Route>

        </Routes>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
