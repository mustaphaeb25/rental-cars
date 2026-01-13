import React from 'react';
import { translateStatus } from '../utils/statusTranslator';
import { FaCheck, FaTimes, FaCalendarAlt, FaCar, FaUser, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import { makeAbsoluteImageUrl } from '../utils/imageUtils';
import './ReservationCard.css';

const ReservationCard = ({ reservation, carDetails, onDeleteReservation, isAdminView, onUpdateStatus }) => {
  const { darkMode } = useTheme();

  const formattedStartDate = new Date(reservation.date_début).toLocaleDateString();
  const formattedEndDate = new Date(reservation.date_fin).toLocaleDateString();

  const imageUrl = carDetails ? (makeAbsoluteImageUrl(carDetails.image_url) || 'https://via.placeholder.com/300x200?text=No+Image') : 'https://via.placeholder.com/300x200?text=No+Image';

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'validée': return 'approved';
      case 'annulée':
      case 'refusée': return 'rejected';
      case 'en attente': return 'pending';
      default: return '';
    }
  };

  const calculateTotal = () => {
    if (!carDetails) return 'N/A';
    const start = new Date(reservation.date_début);
    const end = new Date(reservation.date_fin);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return (days * carDetails.prix_par_jour).toFixed(2);
  };

  return (
    <div className={`new-reservation-card ${darkMode ? 'dark' : ''}`}>
      <div className="card-header">
        <h4>{carDetails ? `${carDetails.marque} ${carDetails.modele}` : 'Car Not Found'}</h4>
        <span className={`status-badge ${getStatusClass(reservation.statut)}`}>
          {translateStatus(reservation.statut)}
        </span>
      </div>

      <div className="card-content">
        <div className="card-image-container">
          <img
            src={imageUrl}
            alt={carDetails ? `${carDetails.marque} ${carDetails.modele}` : 'Car'}
            className="reservation-car-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
        </div>

        <div className="card-body">
          <div className="reservation-details">
            <p><FaCalendarAlt /> From: {formattedStartDate} To: {formattedEndDate}</p>
            {carDetails && <p className="total-price">Total: ${calculateTotal()}</p>}
          </div>

          {isAdminView && (
            <div className="user-info-section">
              <div className="divider"></div>
              <h5>User Information</h5>
              <p><FaUser /> {reservation.user_nom || 'N/A'}</p>
              <p><FaEnvelope /> {reservation.user_email || 'N/A'}</p>
            </div>
          )}
        </div>
      </div>

      {isAdminView && reservation.statut === 'en attente' && (
        <div className="card-actions">
          <button className="btn btn-success" onClick={() => onUpdateStatus(reservation.id, 'validée')}>
            <FaCheck /> Approve
          </button>
          <button className="btn btn-danger" onClick={() => onUpdateStatus(reservation.id, 'refusée')}>
            <FaTimes /> Reject
          </button>
        </div>
      )}
      {!isAdminView && reservation.statut === 'en attente' && (
        <div className="card-actions">
          <button className="btn btn-danger" onClick={() => onDeleteReservation(reservation)}>
            Cancel Reservation
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
