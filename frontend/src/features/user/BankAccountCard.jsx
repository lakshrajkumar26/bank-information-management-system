import React from 'react';
import { toast } from 'react-toastify';
import {
  AccountBalance,
  LocationOn,
  Code,
  CreditCard,
  Person,
  Edit,
  Delete,
  MoreVert
} from '@mui/icons-material';
import api from '../../services/api';
import './BankAccountCard.css';

const BankAccountCard = ({ account, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this bank account?')) {
      onDelete(account._id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bank-account-card">
      <div className="card-header">
        <div className="bank-info">
          <AccountBalance className="bank-icon" />
          <div>
            <h3 className="bank-name">{account.bankName}</h3>
            <p className="bank-branch">
              <LocationOn className="icon-sm" />
              {account.branchName}
            </p>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(account)}
            title="Edit account"
          >
            <Edit />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            title="Delete account"
          >
            <Delete />
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="account-details">
          <div className="detail-item">
            <div className="detail-label">
              <Person className="icon-sm" />
              Account Holder
            </div>
            <div className="detail-value">{account.accountHolderName}</div>
          </div>

          <div className="detail-item">
            <div className="detail-label">
              <CreditCard className="icon-sm" />
              Account Number
            </div>
            <div className="detail-value">{account.accountNumber}</div>
          </div>

          <div className="detail-item">
            <div className="detail-label">
              <Code className="icon-sm" />
              IFSC Code
            </div>
            <div className="detail-value">{account.ifscCode}</div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <div className="account-meta">
          <div className="meta-item">
            <span className="meta-label">Created:</span>
            <span className="meta-value">{formatDate(account.createdAt)}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Updated:</span>
            <span className="meta-value">{formatDate(account.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountCard;
