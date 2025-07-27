import React from 'react';
import Dashboard from './Dashboard';
import ProtectedRoute from '../../components/protectedRoute';

const UserBankPage = () => {
  return (
    <ProtectedRoute allowedRoles={['user','admin']}>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default UserBankPage;
