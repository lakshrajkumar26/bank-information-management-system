import React from 'react';
import {jwtDecode} from 'jwt-decode';
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />   //React Router pushes /login on top of the stack. => so,If the user clicks Back, they'll go back to the protected route (which we don't want).
    }
    try {
        const decode = jwtDecode(token);
        console.info(decode);
        const userRole = decode.role;

        if (!allowedRoles.includes(userRole)) {
            return <Navigate to="/unauthorized" />
        }

        return children;

    }
    catch (err) {
        console.error("Invalid token:", err);
        return <Navigate to="/login" replace />;
    }

}
export default RoleProtectedRoute;