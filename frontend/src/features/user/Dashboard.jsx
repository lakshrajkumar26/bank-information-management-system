import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import BankAccountCard from './BankAccountCard';
import AddBankForm from './AddBankForm';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('/bank-accounts');
      setAccounts(res.data);
    } catch (err) {
      console.error('Error fetching accounts', err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>My Bank Accounts</h2>

      <AddBankForm onSuccess={fetchAccounts} />

      {editingAccount && (
        <AddBankForm
          editing={true}
          initialData={editingAccount}
          onSuccess={() => {
            setEditingAccount(null);
            fetchAccounts();
          }}
        />
      )}

      <div className="accounts-list">
        {accounts.map((acc) => (
          <BankAccountCard
            key={acc._id}
            account={acc}
            onEdit={() => setEditingAccount(acc)}
            onDelete={fetchAccounts}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
