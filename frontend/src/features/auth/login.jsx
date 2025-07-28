import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  CheckCircle,
  Error,
  Warning
} from '@mui/icons-material';
import axios from 'axios';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({
    username: { isValid: false, message: '', isTouched: false },
    password: { isValid: false, message: '', isTouched: false }
  });

  const loginSchema = z.object({
    username: z.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
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
    const passwordValidation = validateField('password', formData.password);
    
    setValidation({
      username: usernameValidation,
      password: passwordValidation
    });

    // Check if any field is invalid
    if (!usernameValidation.isValid || !passwordValidation.isValid) {
      toast.error('Please fix the validation errors before submitting');
      setIsLoading(false);
      return;
    }

    try {
      const result = loginSchema.safeParse(formData);
      
      if (!result.success) {
        const fieldErrors = {};
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      const response = await axios.post('https://bank-information-management-system-oz4y.onrender.com/api/auth/login', formData);
      
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
        
        toast.success('Login successful!');
        
        // Redirect based on role
        if (payload.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
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
            <LoginIcon />
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your account to continue</p>
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

          <button
            type="submit"
            className={`auth-btn auth-btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || !validation.username.isValid || !validation.password.isValid}
          >
            {isLoading && <div className="spinner"></div>}
            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
