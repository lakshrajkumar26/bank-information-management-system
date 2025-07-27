import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchParams, setSearchParams] = useState({
    username: '',
    bankName: '',
    ifscCode: '',
  });

  const token = localStorage.getItem('token');

  // Fetch all accounts (initial load)
  const fetchAllAccounts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/admin/all-bank-accounts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch filtered accounts
  const handleSearch = async () => {
    try {
      const { username, bankName, ifscCode } = searchParams;

      const res = await axios.get('http://localhost:3000/api/admin/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          username,
          bankName,
          ifscCode,
        },
      });

      setAccounts(res.data);
    } catch (err) {
      console.error(err);   
    }
  };

  useEffect(() => {
    fetchAllAccounts(); // on initial load
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👮 Admin Panel</h2>

      {/* Search Filters */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Username"
          value={searchParams.username}
          onChange={(e) => setSearchParams({ ...searchParams, username: e.target.value })}
        />
        <input
          placeholder="Bank Name"
          value={searchParams.bankName}
          onChange={(e) => setSearchParams({ ...searchParams, bankName: e.target.value })}
        />
        <input
          placeholder="IFSC Code"
          value={searchParams.ifscCode}
          onChange={(e) => setSearchParams({ ...searchParams, ifscCode: e.target.value })}
        />
        <button onClick={handleSearch}>🔍 Search</button>
        <button onClick={fetchAllAccounts}>🔄 Reset</button>
      </div>

      {/* Table of Accounts */}
      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Bank</th>
            <th>IFSC</th>
            <th>Branch</th>
            <th>Account No</th>
            <th>Holder Name</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((acc, i) => (
              <tr key={i}>
                <td>{acc.username || acc.user?.username}</td>
                <td>{acc.bankName}</td>
                <td>{acc.ifscCode}</td>
                <td>{acc.branchName}</td>
                <td>{acc.accountNumber}</td>
                <td>{acc.accountHolderName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No accounts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
