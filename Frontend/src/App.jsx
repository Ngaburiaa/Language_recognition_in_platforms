import React, { useState } from 'react'
import InputComponent from './Components/inputComponent'
import SignUp from './pages/signUp'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home';
import Features from './pages/Features';
import HowItWorks from './pages/howItWorks';

import './App.css'

function App() {
 
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="home" element={<Home/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/InputComponent" element={<InputComponent/>} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Features" element={<Features/>} />
          <Route path="/HowItWorks" element={<HowItWorks/>} />

        </Routes>
      </BrowserRouter>
          </>
  )
}

export default App
