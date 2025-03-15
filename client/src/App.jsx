import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';



function App() {


  return (
    <BrowserRouter>
 
    <Routes>
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/sign-in" element={<Signin />} />
    </Routes>
    </BrowserRouter>  
  )
}

export default App
