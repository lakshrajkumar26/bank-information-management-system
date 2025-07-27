import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Home from './components/Home'
import Login from './features/auth/login';
import Register from './features/auth/register';
import AdminPanel from './features/admin/AdminPanel';
import Dashboard from './features/user/Dashboard';
import ProtectedRoute from './components/protectedRoute';
import Unauthorized from './components/Unauthorized';
// import RoleProtectedRoute from './components/RoleProtectedRoute';
import PageNotFound from './components/PageNotFound';
import UserBankPage from './features/user/UserBankPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <h1>Welcome to  My Bank Management platform</h1>
      <Routes>
        {/*  Anyone logged in can access */}
        {/* <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} /> */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>} />

        {/*  Only admin can access */}
        {/* <Route path="/admin" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminPanel /></RoleProtectedRoute>} /> */}

        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user","admin"]}><UserBankPage /></ProtectedRoute>
        }
        />


        <Route path='*' element={<PageNotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />


        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* <Route path='/admin' element={<AdminPanel/>} /> */}



      </Routes>
    </BrowserRouter>
  )
}

export default App
