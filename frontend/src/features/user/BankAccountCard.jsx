import React from 'react';
import axios from '../../services/api';

const BankAccountCard = ({ account, onEdit, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/bank-accounts/${account._id}`);
      onDelete();
    }
  };

  return (
    <div className="bank-card">
      <h4>{account.bankName}</h4>
      <p>Branch: {account.branchName}</p>
      <p>IFSC: {account.ifscCode}</p>
      <p>Account Number: {account.accountNumber}</p>
      <p>Holder: {account.accountHolderName}</p>
      <button onClick={onEdit}>✏️ Edit</button>
      <button onClick={handleDelete}>❌ Delete</button>
    </div>
  );
};

export default BankAccountCard;
