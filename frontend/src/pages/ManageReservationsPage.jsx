import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { getReservations, updateReservationStatus, getCars } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { translateStatus } from '../utils/statusTranslator';
import { FaArrowLeft, FaFilter, FaCalendarAlt } from 'react-icons/fa';
import './ManageReservationsPage.css';
import ReservationCard from '../components/ReservationCard';

const ManageReservationsPage = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.statut === 'en attente').length,
    approved: reservations.filter((r) => r.statut === 'validée').length,
    rejected: reservations.filter((r) => r.statut === 'refusée').length,
    cancelled: reservations.filter((r) => r.statut === 'annulée').length,
  };
  
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin');
    }
  }, [authLoading, isAdmin, navigate]);

  const fetchReservationsAndCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const carsResponse = await getCars();
      const carsMap = carsResponse.data.reduce((acc, car) => {
        acc[car.id] = car;
        return acc;
      }, {});
      setCars(carsMap);
      
      const reservationsResponse = await getReservations();
      setReservations(reservationsResponse.data);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (isAdmin) {
      fetchReservationsAndCars();
    }
  }, [isAdmin]);

  const handleUpdateStatus = async (reservationId, newStatus) => {
    try {
      await updateReservationStatus(reservationId, newStatus);
      setUpdateMessage(`Reservation updated to ${newStatus}.`);
      fetchReservationsAndCars();
    } catch (err) {
      setUpdateMessage('Failed to update reservation.');
    } finally {
        setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const filteredReservations = statusFilter
    ? reservations.filter(r => r.statut === statusFilter)
    : reservations;

  if (authLoading || loading) return <div className="spinner-container"><LoadingSpinner /></div>;

  return (
    <div className={`new-manage-reservations-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="page-header">
          <h1>Manage Reservations</h1>
          <p>Review and manage all booking requests.</p>
        </header>

        <div className="toolbar">
          <button className="btn btn-secondary" onClick={() => navigate('/admin')}><FaArrowLeft /> Dashboard</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><h3>{stats.total}</h3><p>Total</p></div>
          <div className="stat-card"><h3>{stats.pending}</h3><p>Pending</p></div>
          <div className="stat-card"><h3>{stats.approved}</h3><p>Approved</p></div>
          <div className="stat-card"><h3>{stats.rejected}</h3><p>Rejected</p></div>
          <div className="stat-card"><h3>{stats.cancelled}</h3><p>Cancelled</p></div>
        </div>

        <div className="filter-controls">
          <label htmlFor="status-filter"><FaFilter /> Filter by status</label>
          <select id="status-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="en attente">Pending</option>
            <option value="validée">Approved</option>
            <option value="refusée">Rejected</option>
            <option value="annulée">Cancelled</option>
          </select>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {updateMessage && <div className="alert alert-success">{updateMessage}</div>}

        <div className="reservations-list">
          {filteredReservations.length > 0 ? (
            filteredReservations.map(res => (
              <ReservationCard
                key={res.id}
                reservation={res}
                carDetails={cars[res.id_voiture]}
                isAdminView={true}
                onUpdateStatus={handleUpdateStatus}
              />
            ))
          ) : (
            <div className="no-results-card">
              <FaCalendarAlt />
              <p>No reservations found for the selected status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReservationsPage;
