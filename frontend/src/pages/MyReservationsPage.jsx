import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { getReservations, updateReservationStatus, getCars } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FaArrowLeft, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import NewReservationCard from '../components/ReservationCard';
import './MyReservationsPage.css';

const MyReservationsPage = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [cancelMessage, setCancelMessage] = useState('');

  const fetchUserReservations = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const carsResponse = await getCars();
      const carsMap = carsResponse.data.reduce((acc, car) => {
        acc[car.id] = car;
        return acc;
      }, {});
      setCars(carsMap);
      
      const reservationsResponse = await getReservations(user.id);
      setReservations(reservationsResponse.data || []);
    } catch (err) {
      setError(err.response?.status === 404 
        ? "You have no reservations yet." 
        : "Failed to load reservations."
      );
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchUserReservations();
    } else if (!authLoading) {
      setLoading(false);
      setError('You must be logged in to view your reservations.');
    }
  }, [authLoading, isAuthenticated, user]);

  const handleCancelClick = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!reservationToCancel) return;
    try {
      await updateReservationStatus(reservationToCancel.id, 'annulée');
      setCancelMessage('Reservation cancelled successfully!');
      fetchUserReservations();
    } catch (err) {
      setCancelMessage('Failed to cancel reservation.');
    } finally {
      setShowCancelModal(false);
      setTimeout(() => setCancelMessage(''), 3000);
    }
  };

  if (loading || authLoading) {
    return <div className="spinner-container"><LoadingSpinner /></div>;
  }

  return (
    <div className={`new-my-reservations-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="page-header">
          <h1>My Reservations</h1>
          <p>Here are your upcoming and past bookings.</p>
        </header>
        
        <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
        </button>

        {error && <div className="alert alert-info">{error}</div>}
        {cancelMessage && <div className="alert alert-success">{cancelMessage}</div>}

        <div className="reservations-grid">
          {reservations.length > 0 ? (
            reservations.map(res => (
              <NewReservationCard
                key={res.id}
                reservation={res}
                carDetails={cars[res.id_voiture]}
                onDeleteReservation={handleCancelClick}
                isAdminView={false}
              />
            ))
          ) : (
            !error && <p>You have no reservations.</p>
          )}
        </div>
      </div>
      <Modal show={showCancelModal} handleClose={() => setShowCancelModal(false)} title="Confirm Cancellation" onConfirm={confirmCancel}>
          <div className="text-center">
            <FaTimes size={48} className="text-danger mb-3" />
            <h5>Are you sure you want to cancel this reservation?</h5>
          </div>
      </Modal>
    </div>
  );
};

export default MyReservationsPage;
