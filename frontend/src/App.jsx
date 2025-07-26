import { useState } from 'react'
import {BrowserRouter ,Routes,Route } from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Login from './features/auth/login';
import Register from './features/auth/register';
import AdminPanel from './features/admin/AdminPanel';
import Dashboard from './features/user/Dashboard';


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <BrowserRouter>
     <h1>Hi</h1>
     <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
       <Route path='/admin' element={<AdminPanel/>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
