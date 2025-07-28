import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  AdminPanelSettings,
  Search,
  AccountBalance,
  Person,
  LocationOn,
  Code,
  CreditCard,
  Visibility,
  Refresh,
  TrendingUp,
  People,
  Security,
  Clear,
  Close,
  ArrowBack,
  FilterList,
  Sort,
  MoreVert
} from '@mui/icons-material';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  useEffect(() => {
    filterAndSortAccounts();
  }, [allAccounts, searchTerm, filterBy, sortBy, sortOrder]);

  const fetchAllAccounts = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching admin accounts...');
      const token = localStorage.getItem('token');
      console.log('Token available:', !!token);
      
      const response = await axios.get('https://bank-information-management-system-oz4y.onrender.com/api/admin/all-bank-accounts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Admin accounts response:', response.data);
      setAllAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 403) {
        toast.error('Access denied. Admin role required.');
        window.location.href = '/unauthorized';
      } else {
        toast.error('Failed to load bank accounts');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortAccounts = () => {
    let filtered = [...allAccounts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(account =>
        account.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.ifscCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNumber.includes(searchTerm) ||
        account.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterBy !== 'all') {
      filtered = filtered.filter(account => {
        switch (filterBy) {
          case 'bank':
            return account.bankName.toLowerCase().includes(searchTerm.toLowerCase());
          case 'holder':
            return account.accountHolderName.toLowerCase().includes(searchTerm.toLowerCase());
          case 'ifsc':
            return account.ifscCode.toLowerCase().includes(searchTerm.toLowerCase());
          case 'user':
            return account.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return true;
        }
      });
    }

    // Sort accounts
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'username':
          aValue = a.user?.username || '';
          bValue = b.user?.username || '';
          break;
        case 'bankName':
          aValue = a.bankName;
          bValue = b.bankName;
          break;
        case 'accountHolder':
          aValue = a.accountHolderName;
          bValue = b.accountHolderName;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredAccounts(filtered);
  };

  const getStats = () => {
    const totalAccounts = allAccounts.length;
    const uniqueBanks = new Set(allAccounts.map(acc => acc.bankName)).size;
    const uniqueUsers = new Set(allAccounts.map(acc => acc.user?._id || acc.user)).size;
    
    return { totalAccounts, uniqueBanks, uniqueUsers };
  };

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setShowDetailPopup(true);
  };

  const handleClosePopup = () => {
    setShowDetailPopup(false);
    setSelectedAccount(null);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <Sort className="sort-icon" />;
    return sortOrder === 'asc' ? 
      <Sort className="sort-icon active" style={{ transform: 'rotate(180deg)' }} /> : 
      <Sort className="sort-icon active" />;
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading admin data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header Section */}
        <div className="admin-header">
          <div className="admin-title">
            <AdminPanelSettings className="admin-icon" />
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage and monitor all bank accounts across the platform</p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="admin-stats">
            <div className="stat-card">
              <TrendingUp />
              <h3>{stats.totalAccounts}</h3>
              <p>Total Accounts</p>
            </div>
            <div className="stat-card">
              <AccountBalance />
              <h3>{stats.uniqueBanks}</h3>
              <p>Unique Banks</p>
            </div>
            <div className="stat-card">
              <People />
              <h3>{stats.uniqueUsers}</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-header">
            <Search className="search-icon" />
            <h2>Search & Filter</h2>
          </div>
          
          <div className="search-filters">
            <div className="filter-group">
              <label className="filter-label">Search Term</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Search by bank, holder, IFSC, account number, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">Filter By</label>
              <select
                className="filter-input"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >
                <option value="all">All Fields</option>
                <option value="bank">Bank Name</option>
                <option value="holder">Account Holder</option>
                <option value="ifsc">IFSC Code</option>
                <option value="user">Username</option>
              </select>
            </div>
          </div>
          
          <div className="search-actions">
            <button
              className="search-btn"
              onClick={fetchAllAccounts}
            >
              <Refresh />
              Refresh Data
            </button>
            <button
              className="search-btn search-btn-primary"
              onClick={() => {
                setSearchTerm('');
                setFilterBy('all');
                setSortBy('createdAt');
                setSortOrder('desc');
              }}
            >
              <Clear />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Accounts Table Section */}
        <div className="accounts-section">
          <div className="section-header">
            <h2>All Bank Accounts</h2>
            <p>Showing {filteredAccounts.length} of {allAccounts.length} accounts</p>
          </div>

          {filteredAccounts.length === 0 ? (
            <div className="empty-state">
              <AccountBalance className="empty-icon" />
              <h3>No Accounts Found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="modern-table-container">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('username')} className="sortable">
                      <div className="th-content">
                        <Person className="th-icon" />
                        <span>User Info</span>
                        {getSortIcon('username')}
                      </div>
                    </th>
                    <th onClick={() => handleSort('bankName')} className="sortable">
                      <div className="th-content">
                        <AccountBalance className="th-icon" />
                        <span>Bank Details</span>
                        {getSortIcon('bankName')}
                      </div>
                    </th>
                    <th onClick={() => handleSort('accountHolder')} className="sortable">
                      <div className="th-content">
                        <CreditCard className="th-icon" />
                        <span>Account Info</span>
                        {getSortIcon('accountHolder')}
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <LocationOn className="th-icon" />
                        <span>Branch</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Code className="th-icon" />
                        <span>IFSC Code</span>
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <Visibility className="th-icon" />
                        <span>Actions</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account._id} className="account-row">
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">
                            <Person />
                          </div>
                          <div className="user-details">
                            <span className="username">{account.user?.username || 'Unknown User'}</span>
                            <span className="user-role">{account.user?.role || 'user'}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="bank-info">
                          <span className="bank-name">{account.bankName}</span>
                        </div>
                      </td>
                      <td>
                        <div className="account-info">
                          <span className="account-number">{account.accountNumber}</span>
                          <span className="account-holder">{account.accountHolderName}</span>
                        </div>
                      </td>
                      <td>
                        <span className="branch-name">{account.branchName}</span>
                      </td>
                      <td>
                        <span className="ifsc-code">{account.ifscCode}</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="view-btn" 
                            title="View Details"
                            onClick={() => handleViewDetails(account)}
                          >
                            <Visibility />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Popup */}
        {showDetailPopup && selectedAccount && (
          <div className="detail-popup-overlay" onClick={handleClosePopup}>
            <div className="detail-popup" onClick={(e) => e.stopPropagation()}>
              <div className="popup-header">
                <h2>{selectedAccount.user?.username || 'Account Details'}</h2>
                <button className="close-popup-btn" onClick={handleClosePopup}>
                  <Close />
                </button>
              </div>
              
              <div className="popup-content">
                <div className="detail-section">
                  <h3>User Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Username:</label>
                      <span>{selectedAccount.user?.username || 'Unknown'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedAccount.user?.email || 'Not available'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Role:</label>
                      <span className="role-badge">{selectedAccount.user?.role || 'user'}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Bank Account Information</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Bank Name:</label>
                      <span>{selectedAccount.bankName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Branch Name:</label>
                      <span>{selectedAccount.branchName}</span>
                    </div>
                    <div className="detail-item">
                      <label>IFSC Code:</label>
                      <span className="code-text">{selectedAccount.ifscCode}</span>
                    </div>
                    <div className="detail-item">
                      <label>Account Number:</label>
                      <span className="code-text">{selectedAccount.accountNumber}</span>
                    </div>
                    <div className="detail-item">
                      <label>Account Holder:</label>
                      <span>{selectedAccount.accountHolderName}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Timestamps</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Created:</label>
                      <span>{new Date(selectedAccount.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <label>Last Updated:</label>
                      <span>{new Date(selectedAccount.updatedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="popup-actions">
                <button className="popup-btn popup-btn-secondary" onClick={handleClosePopup}>
                  <ArrowBack />
                  Back to List
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
