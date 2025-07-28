import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Dashboard as DashboardIcon,
  Add,
  AccountBalance,
  Refresh
} from '@mui/icons-material';
import BankAccountCard from './BankAccountCard';
import AddBankForm from './AddBankForm';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      const response = await api.get('/bank-accounts');
      // The backend returns the accounts array directly
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
      toast.error('Failed to load bank accounts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchBankAccounts();
    toast.success('Bank account added successfully!');
  };

  const handleEditSuccess = () => {
    setShowAddForm(false);
    setEditingAccount(null);
    fetchBankAccounts();
    toast.success('Bank account updated successfully!');
  };

  const handleDelete = async (accountId) => {
    try {
      console.log('Attempting to delete account with ID:', accountId);
      const response = await api.delete(`/bank-accounts/${accountId}`);
      console.log('Delete response:', response);
      
      if (response.status === 200) {
        setBankAccounts(prev => prev.filter(account => account._id !== accountId));
        toast.success('Bank account deleted successfully!');
      } else {
        toast.error('Failed to delete bank account');
      }
    } catch (error) {
      console.error('Error deleting bank account:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete bank account';
      toast.error(errorMessage);
    }
  };

  const handleEdit = (account) => {
    setEditingAccount(account);
    setShowAddForm(true);
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading your bank accounts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <DashboardIcon className="dashboard-icon" />
            <div>
              <h1>My Bank Accounts</h1>
              <p>Manage and track all your bank accounts in one place</p>
            </div>
          </div>
          <div className="dashboard-actions">
            <button
              className="dashboard-btn dashboard-btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              <Add />
              Add Bank Account
            </button>
          </div>
        </div>

        {bankAccounts.length === 0 ? (
          <div className="empty-state">
            <AccountBalance className="empty-icon" />
            <h3>No Bank Accounts Yet</h3>
            <p>Start by adding your first bank account to begin managing your finances</p>
            <button
              className="dashboard-btn dashboard-btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              <Add />
              Add Your First Account
            </button>
          </div>
        ) : (
          <div className="accounts-grid">
            {bankAccounts.map((account) => (
              <BankAccountCard
                key={account._id}
                account={account}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        {showAddForm && (
          <div className="form-overlay">
            <div className="form-modal">
              <div className="form-modal-header">
                <h2>{editingAccount ? 'Edit Bank Account' : 'Add New Bank Account'}</h2>
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingAccount(null);
                  }}
                >
                  ✕
                </button>
              </div>
              <AddBankForm
                editingAccount={editingAccount}
                onSuccess={editingAccount ? handleEditSuccess : handleAddSuccess}
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingAccount(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
