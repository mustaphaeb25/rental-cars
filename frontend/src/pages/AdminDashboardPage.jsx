import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FaCar, FaClipboardList, FaEnvelope, FaChartLine, FaUserCog, FaCog 
} from 'react-icons/fa';
import './AdminDashboardPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminCard = ({ to, icon, title, description, disabled }) => {
  const { darkMode } = useTheme();
  return (
    <Link to={to} className={`admin-card ${darkMode ? 'dark' : 'light'} ${disabled ? 'disabled' : ''}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

const AdminDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();

  if (authLoading) {
    return <div className="spinner-container"><LoadingSpinner /></div>;
  }

  return (
    <div className={`new-admin-dashboard-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user?.name || 'Admin'}!</p>
        </header>

        <div className="dashboard-grid">
          <AdminCard
            to="/admin/manage-cars"
            icon={<FaCar />}
            title="Manage Cars"
            description="Add, edit, or remove car listings."
          />
          <AdminCard
            to="/admin/manage-reservations"
            icon={<FaClipboardList />}
            title="Manage Reservations"
            description="View and manage all user reservations."
          />
          <AdminCard
            to="/admin/messages"
            icon={<FaEnvelope />}
            title="Contact Messages"
            description="Read and reply to user inquiries."
          />
          <AdminCard
            to="/admin/analytics"
            icon={<FaChartLine />}
            title="Analytics"
            description="View platform statistics and reports."
          />
          <AdminCard
            to="/admin/manage-users"
            icon={<FaUserCog />}
            title="User Management"
            description="Manage user accounts and roles."
            disabled
          />
          <AdminCard
            to="/admin/settings"
            icon={<FaCog />}
            title="Settings"
            description="Configure application settings."
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
