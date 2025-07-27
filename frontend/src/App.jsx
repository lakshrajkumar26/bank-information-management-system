import { useState } from 'react'
import {BrowserRouter ,Routes,Route } from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Login from './features/auth/login';
import Register from './features/auth/register';
import AdminPanel from './features/admin/AdminPanel';
import Dashboard from './features/user/Dashboard';
import ProtectedRoute from './components/protectedRoute';
import Unauthorized from './components/Unauthorized';
import RoleProtectedRoute from './components/RoleProtectedRoute';


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <BrowserRouter>
     <h1>Hi</h1>
     <Routes>
      {/*  Anyone logged in can access */}
      <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/></ProtectedRoute>} />
      {/*  Only admin can access */}
      <Route path="/admin" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminPanel /></RoleProtectedRoute>} />

      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      
       {/* <Route path='/admin' element={<AdminPanel/>} /> */}


       <Route path="/unauthorized" element={<Unauthorized />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
