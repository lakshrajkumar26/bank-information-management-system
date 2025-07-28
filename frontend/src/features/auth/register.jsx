import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
  PersonAdd,
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Error,
  Warning,
  AdminPanelSettings,
  SupervisorAccount,
  Person as PersonIcon
} from '@mui/icons-material';
import axios from 'axios';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState({
    username: { isValid: false, message: '', isTouched: false },
    email: { isValid: false, message: '', isTouched: false },
    password: { isValid: false, message: '', isTouched: false },
    confirmPassword: { isValid: false, message: '', isTouched: false },
    role: { isValid: true, message: '', isTouched: false }
  });

  const registerSchema = z.object({
    username: z.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string()
      .email('Please enter a valid email address')
      .min(5, 'Email must be at least 5 characters')
      .max(50, 'Email must be less than 50 characters'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be less than 50 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string(),
    role: z.enum(['admin', 'manager', 'user'], {
      errorMap: () => ({ message: 'Please select a valid role' })
    })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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
        if (value.length < 5) {
          return { isValid: false, message: 'Email must be at least 5 characters', isTouched: true };
        }
        if (value.length > 50) {
          return { isValid: false, message: 'Email must be less than 50 characters', isTouched: true };
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
      
      if (name === 'confirmPassword') {
        if (value.length === 0) {
          return { isValid: false, message: 'Please confirm your password', isTouched: true };
        }
        if (value !== formData.password) {
          return { isValid: false, message: 'Passwords do not match', isTouched: true };
        }
        return { isValid: true, message: 'Passwords match', isTouched: true };
      }

      if (name === 'role') {
        if (!value || value === '') {
          return { isValid: false, message: 'Please select a role', isTouched: true };
        }
        if (!['admin', 'manager', 'user'].includes(value)) {
          return { isValid: false, message: 'Please select a valid role', isTouched: true };
        }
        return { isValid: true, message: 'Role is valid', isTouched: true };
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

    // Special handling for password confirmation
    if (name === 'password') {
      const confirmValidation = validateField('confirmPassword', formData.confirmPassword);
      setValidation(prev => ({
        ...prev,
        confirmPassword: confirmValidation
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate all fields
    const usernameValidation = validateField('username', formData.username);
    const emailValidation = validateField('email', formData.email);
    const passwordValidation = validateField('password', formData.password);
    const confirmPasswordValidation = validateField('confirmPassword', formData.confirmPassword);
    const roleValidation = validateField('role', formData.role);
    
    setValidation({
      username: usernameValidation,
      email: emailValidation,
      password: passwordValidation,
      confirmPassword: confirmPasswordValidation,
      role: roleValidation
    });

    // Check if any field is invalid
    if (!usernameValidation.isValid || !emailValidation.isValid || 
        !passwordValidation.isValid || !confirmPasswordValidation.isValid || !roleValidation.isValid) {
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
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Decode the token to get user data
        const token = response.data.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Store user data in localStorage
        const userData = {
          id: payload.id,
          username: formData.username,
          role: payload.role
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast.success('Registration successful! Welcome to our platform.');
        
        // Redirect based on role
        if (payload.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
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

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'manager':
        return <SupervisorAccount />;
      case 'user':
        return <PersonIcon />;
      default:
        return <PersonIcon />;
    }
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
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-input ${getValidationColor('password')}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
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
              <Lock className="input-icon" />
              Confirm Password
            </label>
            <div className="input-wrapper">
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`form-input ${getValidationColor('confirmPassword')}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              {getValidationIcon('confirmPassword')}
            </div>
            {validation.confirmPassword.isTouched && (
              <div className={`validation-message ${validation.confirmPassword.isValid ? 'valid' : 'invalid'}`}>
                {validation.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <AdminPanelSettings className="input-icon" />
              Role
            </label>
            <div className="input-wrapper">
              <select
                name="role"
                className={`form-input form-select ${getValidationColor('role')}`}
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="user">User - Manage your own bank accounts</option>
                <option value="manager">Manager - Limited administrative access</option>
                <option value="admin">Admin - Full system access</option>
              </select>
              {getValidationIcon('role')}
            </div>
            {validation.role.isTouched && (
              <div className={`validation-message ${validation.role.isValid ? 'valid' : 'invalid'}`}>
                {validation.role.message}
              </div>
            )}
            {errors.role && <p className="error-message">{errors.role}</p>}
          </div>

          <button
            type="submit"
            className={`auth-btn auth-btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !validation.username.isValid || !validation.email.isValid || 
                     !validation.password.isValid || !validation.confirmPassword.isValid || !validation.role.isValid}
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
