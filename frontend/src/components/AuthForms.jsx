import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { FaUser, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const AuthForms = ({ isRegister, onSubmit, loading, error }) => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Simple password strength calculation
    let strength = 0;
    if (value.length > 5) strength++;
    if (value.length > 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (isRegister) {
      if (!nom || !email || !password || !confirmPassword) {
        setValidationError('All fields are required.');
        return;
      }
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters long.');
        return;
      }
      onSubmit(nom, email, password);
    } else {
      if (!email || !password) {
        setValidationError('Email and password are required.');
        return;
      }
      onSubmit(email, password);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      {validationError && (
        <Alert variant="danger" className="auth-alert">
          {validationError}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="auth-alert">
          {error}
        </Alert>
      )}

      {isRegister && (
        <Form.Group className="mb-4" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaUser />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={`form-control-lg ${darkMode ? 'dark-mode' : ''}`}
            />
          </InputGroup>
        </Form.Group>
      )}

      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaEnvelope />
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control-lg ${darkMode ? 'dark-mode' : ''}`}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <FaLock />
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={handlePasswordChange}
            className={`form-control-lg ${darkMode ? 'dark-mode' : ''}`}
          />
        </InputGroup>
        {isRegister && password && (
          <div className="password-strength mt-2">
            <div className="strength-meter">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`strength-bar ${passwordStrength >= i ? 'active' : ''}`}
                  style={{ backgroundColor: passwordStrength >= i ? getStrengthColor(passwordStrength) : '' }}
                ></div>
              ))}
            </div>
            <small className="strength-text">
              {passwordStrength < 2
                ? 'Weak'
                : passwordStrength < 4
                ? 'Moderate'
                : 'Strong'}
            </small>
          </div>
        )}
      </Form.Group>

      {isRegister && (
        <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <FaCheck />
            </InputGroup.Text>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`form-control-lg ${darkMode ? 'dark-mode' : ''}`}
            />
          </InputGroup>
        </Form.Group>
      )}

      <Button
        variant="primary"
        type="submit"
        className="w-100 auth-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {isRegister ? 'Create Account' : 'Sign In'}
          </>
        )}
      </Button>
    </Form>
  );
};

// Helper function for password strength colors
const getStrengthColor = (strength) => {
  if (strength < 2) return '#ff4d4f'; // Red
  if (strength < 4) return '#faad14'; // Orange
  return '#52c41a'; // Green
};


export default AuthForms;