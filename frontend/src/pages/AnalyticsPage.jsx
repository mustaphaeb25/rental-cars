import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  FiUsers, FiCalendar, FiDollarSign, FiBarChart2, 
  FiTrendingUp, FiPieChart 
} from 'react-icons/fi';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './AnalyticsPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const AnalyticsCard = ({ title, icon, children }) => {
    const { darkMode } = useTheme();
    return (
        <div className={`analytics-card ${darkMode ? 'dark' : ''}`}>
            <div className="card-header">
                {icon}
                <h3>{title}</h3>
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

const AnalyticsPage = () => {
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(true);

  // Mock data
  const data = {
    revenue: [
      { name: 'Jan', revenue: 4000 },
      { name: 'Feb', revenue: 3000 },
      { name: 'Mar', revenue: 5000 },
    ],
    bookings: [
        { name: 'Jan', bookings: 40 },
        { name: 'Feb', bookings: 30 },
        { name: 'Mar', bookings: 50 },
    ],
    vehicleTypes: [
      { name: 'Sedan', value: 400 },
      { name: 'SUV', value: 300 },
      { name: 'Luxury', value: 200 },
    ],
  };
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <div className="spinner-container"><LoadingSpinner /></div>;
  }

  const COLORS = ['#0D47A1', '#1976D2', '#42A5F5'];

  return (
    <div className={`new-analytics-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="page-header">
          <h1>Analytics</h1>
          <p>An overview of your platform's performance.</p>
        </header>

        <div className="analytics-grid">
            <AnalyticsCard title="Revenue Trend" icon={<FiTrendingUp/>}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke={darkMode ? '#8884d8' : '#0D47A1'} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </AnalyticsCard>

            <AnalyticsCard title="Booking Activity" icon={<FiBarChart2/>}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.bookings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="bookings" fill={darkMode ? '#82ca9d' : '#42A5F5'} />
                    </BarChart>
                </ResponsiveContainer>
            </AnalyticsCard>

            <AnalyticsCard title="Vehicle Types" icon={<FiPieChart/>}>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={data.vehicleTypes} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                            {data.vehicleTypes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </AnalyticsCard>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
