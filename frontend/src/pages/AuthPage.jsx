import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaSignInAlt, FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './AuthPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const AuthPage = () => {
  const { signIn, signUp, loading, user } = useAuth();
  const { darkMode } = useTheme();
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    setIsRegister(mode === 'register');
  }, [location.search]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    let result;
    if (isRegister) {
      if (password !== confirmPassword) {
        return setError("Passwords do not match");
      }
      result = await signUp(name, email, password);
    } else {
      result = await signIn(email, password);
    }

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  if (loading || user) {
    return <div className="auth-loading-overlay"><LoadingSpinner /></div>;
  }

  return (
    <div className={`new-auth-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              {isRegister ? <FaUserPlus /> : <FaSignInAlt />}
            </div>
            <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <p>{isRegister ? 'Join us and start your journey.' : 'Sign in to continue.'}</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={onSubmit}>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="name"><FaUser /> Name</label>
                <input type="text" id="name" name="name" value={name} onChange={onChange} required />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email"><FaEnvelope /> Email</label>
              <input type="email" id="email" name="email" value={email} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password"><FaLock /> Password</label>
              <input type="password" id="password" name="password" value={password} onChange={onChange} required />
            </div>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="confirmPassword"><FaLock /> Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
              </div>
            )}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Link to={isRegister ? '/login' : '/register'}>
                {isRegister ? 'Login' : 'Register'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
