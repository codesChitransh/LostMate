import './index.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import CreateLostItem from './pages/CreateLostItem';



function App() {


  return (
    <BrowserRouter>
 
    <Routes>
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/sign-in" element={<Signin />} />
    <Route path="/report" element={<CreateLostItem/>} />
    
    </Routes>
    </BrowserRouter>  
  )
}

export default App
