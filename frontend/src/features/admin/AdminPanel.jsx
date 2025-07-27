import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [filterBy, setFilterBy] = useState('username');

  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get('http://localhost:5000/api/admin/all-bank-accounts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
      
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter((acc) =>
    acc[filterBy]?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <h2> Admin Panel - All Bank Accounts</h2>

      <div className="filter-section">
        <input
          placeholder={`Search by ${filterBy}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterBy(e.target.value)} value={filterBy}>
          <option value="username">Username</option>
          <option value="bankName">Bank Name</option>
          <option value="ifscCode">IFSC Code</option>
        </select>
      </div>

      <table>
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
          {filteredAccounts.map((acc, idx) => (
            <tr key={idx}>
              <td>{acc.username}</td>
              <td>{acc.bankName}</td>
              <td>{acc.ifscCode}</td>
              <td>{acc.branchName}</td>
              <td>{acc.accountNumber}</td>
              <td>{acc.accountHolderName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
