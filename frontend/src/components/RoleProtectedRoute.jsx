import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    console.log('RoleProtectedRoute - Decoded token:', decoded);
    console.log('RoleProtectedRoute - User role:', decoded.role);

    if (decoded.exp < currentTime) {
      console.log('Token expired, redirecting to login');
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    // Check if user has admin role
    if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
      console.log('Access denied - redirecting to main page');
      window.location.href = 'https://bank-information-management-system-t81l.onrender.com/';
      return null;
    }
    
    console.log('Access granted to admin panel');
    return children;
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

export default RoleProtectedRoute;
