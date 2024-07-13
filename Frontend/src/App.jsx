import React from 'react'
import InputComponent from './Components/inputComponent'
import SignUp from './pages/signUp'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';

import './App.css'

function App() {
 
  return (
    <>
      {/* <div>
        {/* < InputComponent/> */}
        {/* <SignUp/> */}
        {/* </div> */} 
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/InputComponent" element={<InputComponent/>} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
