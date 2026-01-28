import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import FormInput from '../components/FormInput';
import { validateForm } from '../utils/validation';
import './Auth.css';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      email: { required: true, email: true, label: 'Email' },
      password: { required: true, label: 'Password' },
    };

    const validation = validateForm(formData, validationRules);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          {serverError && (
            <div className="alert alert-error">{serverError}</div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
              required
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="••••••••"
              required
            />

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>

          <div className="demo-credentials">
            <p><strong>Demo Account:</strong></p>
            <p>Create a new account or use any email/password combination for testing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
