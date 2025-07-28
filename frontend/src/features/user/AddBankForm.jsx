import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import {
  AccountBalance,
  LocationOn,
  Code,
  CreditCard,
  Person,
  Save,
  Cancel,
  ArrowForward
} from '@mui/icons-material';
import api from '../../services/api';
import './AddBankForm.css';

const bankAccountSchema = z.object({
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, {
    message: "Invalid IFSC code format. Must be 11 characters: 4 letters + 0 + 6 alphanumeric",
  }),
  branchName: z.string().min(3, "Branch name must be at least 3 characters").regex(/^[a-zA-Z\s]+$/, {
    message: "Branch name must only contain letters and spaces",
  }),
  bankName: z.string().min(3, "Bank name must be at least 3 characters").regex(/^[a-zA-Z\s]+$/, {
    message: "Bank name must only contain letters and spaces",
  }),
  accountNumber: z.string().regex(/^\d{9,18}$/, {
    message: "Account number must be 9 to 18 digits only",
  }),
  accountHolderName: z.string().min(3, "Name must be at least 3 characters").regex(/^[a-zA-Z\s]+$/, {
    message: "Name must only contain letters and spaces",
  }),
});

const AddBankForm = ({ editingAccount, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingAccount) {
      setFormData({
        ifscCode: editingAccount.ifscCode || '',
        branchName: editingAccount.branchName || '',
        bankName: editingAccount.bankName || '',
        accountNumber: editingAccount.accountNumber || '',
        accountHolderName: editingAccount.accountHolderName || '',
      });
    }
  }, [editingAccount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = bankAccountSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      if (result.error && result.error.errors) {
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
      } else {
        fieldErrors.general = "Please check all fields and try again.";
      }
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      if (editingAccount) {
        await api.put(`/bank-accounts/${editingAccount._id}`, result.data);
      } else {
        await api.post('/bank-accounts', result.data);
      }
      setFormData({
        ifscCode: '',
        branchName: '',
        bankName: '',
        accountNumber: '',
        accountHolderName: '',
      });
      setErrors({});
      onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to save bank account.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bank-form">
      {errors.general && (
        <div className="general-error">
          <p className="error-message">{errors.general}</p>
        </div>
      )}

      <div className="form-fields">
        <div className="form-group">
          <label className="form-label">
            <AccountBalance className="input-icon" />
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            className={`form-input ${errors.bankName ? 'error' : ''}`}
            placeholder="Enter bank name"
            value={formData.bankName}
            onChange={handleInputChange}
            required
          />
          {errors.bankName && <p className="error-message">{errors.bankName}</p>}
          <p className="helper-text">Enter the full name of the bank (letters and spaces only)</p>
        </div>

        <div className="form-group">
          <label className="form-label">
            <LocationOn className="input-icon" />
            Branch Name
          </label>
          <input
            type="text"
            name="branchName"
            className={`form-input ${errors.branchName ? 'error' : ''}`}
            placeholder="Enter branch name"
            value={formData.branchName}
            onChange={handleInputChange}
            required
          />
          {errors.branchName && <p className="error-message">{errors.branchName}</p>}
          <p className="helper-text">Enter the branch name (letters and spaces only)</p>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Code className="input-icon" />
            IFSC Code
          </label>
          <input
            type="text"
            name="ifscCode"
            className={`form-input ${errors.ifscCode ? 'error' : ''}`}
            placeholder="Enter IFSC code (e.g., SBIN0001234)"
            value={formData.ifscCode}
            onChange={handleInputChange}
            required
          />
          {errors.ifscCode && <p className="error-message">{errors.ifscCode}</p>}
          <p className="helper-text">Format: 4 letters + 0 + 6 alphanumeric characters</p>
        </div>

        <div className="form-group">
          <label className="form-label">
            <CreditCard className="input-icon" />
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            className={`form-input ${errors.accountNumber ? 'error' : ''}`}
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={handleInputChange}
            required
          />
          {errors.accountNumber && <p className="error-message">{errors.accountNumber}</p>}
          <p className="helper-text">Enter 9 to 18 digits only</p>
        </div>

        <div className="form-group">
          <label className="form-label">
            <Person className="input-icon" />
            Account Holder Name
          </label>
          <input
            type="text"
            name="accountHolderName"
            className={`form-input ${errors.accountHolderName ? 'error' : ''}`}
            placeholder="Enter account holder name"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            required
          />
          {errors.accountHolderName && <p className="error-message">{errors.accountHolderName}</p>}
          <p className="helper-text">Enter the account holder's full name (letters and spaces only)</p>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="form-btn"
          onClick={onCancel}
          disabled={isLoading}
        >
          <Cancel />
          Cancel
        </button>
        <button
          type="submit"
          className={`form-btn form-btn-primary ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading && <div className="spinner"></div>}
          <Save />
          {editingAccount ? 'Update Account' : 'Save Account'}
        </button>
      </div>
    </form>
  );
};

export default AddBankForm;
