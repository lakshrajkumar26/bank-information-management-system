import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
  PersonAdd,
  Person,
  Email,
  Lock,
  AdminPanelSettings,
  CheckCircle,
  Error
} from '@mui/icons-material';
import axios from 'axios';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState({
    username: { isValid: false, message: '', isTouched: false },
    email: { isValid: false, message: '', isTouched: false },
    password: { isValid: false, message: '', isTouched: false }
  });

  const registerSchema = z.object({
    username: z.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string()
      .email('Please enter a valid email address'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
  });

  const validateField = (name, value) => {
    try {
      if (name === 'username') {
        if (value.length === 0) {
          return { isValid: false, message: 'Username is required', isTouched: true };
        }
        if (value.length < 3) {
          return { isValid: false, message: 'Username must be at least 3 characters', isTouched: true };
        }
        if (value.length > 20) {
          return { isValid: false, message: 'Username must be less than 20 characters', isTouched: true };
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return { isValid: false, message: 'Username can only contain letters, numbers, and underscores', isTouched: true };
        }
        return { isValid: true, message: 'Username is valid', isTouched: true };
      }
      
      if (name === 'email') {
        if (value.length === 0) {
          return { isValid: false, message: 'Email is required', isTouched: true };
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return { isValid: false, message: 'Please enter a valid email address', isTouched: true };
        }
        return { isValid: true, message: 'Email is valid', isTouched: true };
      }
      
      if (name === 'password') {
        if (value.length === 0) {
          return { isValid: false, message: 'Password is required', isTouched: true };
        }
        if (value.length < 6) {
          return { isValid: false, message: 'Password must be at least 6 characters', isTouched: true };
        }
        if (value.length > 50) {
          return { isValid: false, message: 'Password must be less than 50 characters', isTouched: true };
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return { isValid: false, message: 'Password must contain uppercase, lowercase, and number', isTouched: true };
        }
        return { isValid: true, message: 'Password is valid', isTouched: true };
      }
      
      return { isValid: false, message: '', isTouched: false };
    } catch (error) {
      return { isValid: false, message: 'Invalid input', isTouched: true };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear previous errors
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation
    const fieldValidation = validateField(name, value);
    setValidation(prev => ({
      ...prev,
      [name]: fieldValidation
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate all fields
    const usernameValidation = validateField('username', formData.username);
    const emailValidation = validateField('email', formData.email);
    const passwordValidation = validateField('password', formData.password);
    
    setValidation({
      username: usernameValidation,
      email: emailValidation,
      password: passwordValidation
    });

    // Check if any field is invalid
    if (!usernameValidation.isValid || !emailValidation.isValid || !passwordValidation.isValid) {
      toast.error('Please fix the validation errors before submitting');
      setIsLoading(false);
      return;
    }

    try {
      const result = registerSchema.safeParse(formData);
      
      if (!result.success) {
        const fieldErrors = {};
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      const response = await axios.post('https://bank-information-management-system-oz4y.onrender.com/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (response.data.message) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationIcon = (fieldName) => {
    const field = validation[fieldName];
    if (!field.isTouched) return null;
    
    if (field.isValid) {
      return <CheckCircle className="validation-icon valid" />;
    } else {
      return <Error className="validation-icon invalid" />;
    }
  };

  const getValidationColor = (fieldName) => {
    const field = validation[fieldName];
    if (!field.isTouched) return '';
    return field.isValid ? 'valid' : 'invalid';
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <PersonAdd />
          </div>
          <h1>Create Account</h1>
          <p>Join our platform and start managing your bank accounts</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">
              <Person className="input-icon" />
              Username
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                name="username"
                className={`form-input ${getValidationColor('username')}`}
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              {getValidationIcon('username')}
            </div>
            {validation.username.isTouched && (
              <div className={`validation-message ${validation.username.isValid ? 'valid' : 'invalid'}`}>
                {validation.username.message}
              </div>
            )}
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Email className="input-icon" />
              Email
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                name="email"
                className={`form-input ${getValidationColor('email')}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {getValidationIcon('email')}
            </div>
            {validation.email.isTouched && (
              <div className={`validation-message ${validation.email.isValid ? 'valid' : 'invalid'}`}>
                {validation.email.message}
              </div>
            )}
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock className="input-icon" />
              Password
            </label>
            <div className="input-wrapper">
              <input
                type="password"
                name="password"
                className={`form-input ${getValidationColor('password')}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {getValidationIcon('password')}
            </div>
            {validation.password.isTouched && (
              <div className={`validation-message ${validation.password.isValid ? 'valid' : 'invalid'}`}>
                {validation.password.message}
              </div>
            )}
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <AdminPanelSettings className="input-icon" />
              Role
            </label>
            <div className="input-wrapper">
              <select
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`auth-btn auth-btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !validation.username.isValid || !validation.email.isValid || !validation.password.isValid}
          >
            {isLoading && <div className="spinner"></div>}
            <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
