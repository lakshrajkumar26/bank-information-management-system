import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { z } from 'zod';

const schema = z.object({
  ifscCode: z.string().min(3),
  branchName: z.string().min(2),
  bankName: z.string().min(2),
  accountNumber: z.string().min(4),
  accountHolderName: z.string().min(2),
});

const AddBankForm = ({ editing = false, initialData = {}, onSuccess }) => {
  const [formData, setFormData] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing && initialData) {
      setFormData(initialData);
    }
  }, [editing, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      if (editing) {
        await axios.put(`/bank-accounts/${formData._id}`, formData);
      } else {
        await axios.post('/bank-accounts', formData);
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
      console.error('Error saving bank account', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editing ? 'Edit Bank Account' : 'Add New Bank Account'}</h3>

      {['ifscCode', 'branchName', 'bankName', 'accountNumber', 'accountHolderName'].map((field) => (
        <div key={field}>
          <label>{field}</label>
          <input
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
          {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
        </div>
      ))}

      <button type="submit">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default AddBankForm;
